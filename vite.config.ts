/*
 * @Author: Libra
 * @Date: 2023-03-07 18:03:36
 * @LastEditTime: 2023-06-05 15:42:18
 * @LastEditors: Libra
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'

import type { ConfigEnv, UserConfigExport } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
	const isServe = command === 'serve'
	const isBuild = command === 'build'
	const sourcemap = isServe || !!process.env.VSCODE_DEBUG
	return {
		base: './',
		plugins: [
			vue(),
			vueJsx(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				// allow auto load markdown components under `./src/components/`
				extensions: ['vue', 'md'],
				// allow auto import and register components used in markdown
				include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass',
					}),
				],
				dts: 'src/components.d.ts',
			}),
			viteMockServe({
				mockPath: 'mock',
			}),
			electron({
				entry: 'electron/main.ts',
				vite: {
					build: {
						sourcemap,
						minify: isBuild,
						outDir: 'dist-electron',
					},
				},
			}),
			renderer(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "./src/style/element/index.scss" as *;`,
				},
			},
		},
	}
}
