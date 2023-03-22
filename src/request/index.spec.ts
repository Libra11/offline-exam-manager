/*
 * @Author: Libra
 * @Date: 2023-03-22 11:35:57
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/src/request/index.spec.ts
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { getOptions } from './index'
import { UserStore } from '@/store/modules/user'

describe('fetch', () => {
	let app: ReturnType<typeof createApp>
	let store: ReturnType<typeof UserStore>

	beforeEach(() => {
		app = createApp({})
		const pinia = createPinia()
		app.use(pinia)
		store = UserStore(pinia)
	})
	it('getOptions', () => {
		expect(getOptions({ method: 'POST' })).toEqual({
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: '',
			},
		})
		expect(getOptions()).toEqual({
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: '',
			},
		})
		// have token
		const token = '123456'
		store.setToken(token)
		expect(getOptions()).toEqual({
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	})
})
