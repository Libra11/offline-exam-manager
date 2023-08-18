/*
 * @Author: Libra
 * @Date: 2023-06-12 18:08:43
 * @LastEditors: Libra
 * @Description:
 */
/// <reference types="vite/client" />

declare module 'animejs/lib/anime.es.js'

declare module 'myTypes' {
	export interface IP {
		serverIp: string
		localIp: string
	}

	export interface IMessage<T> {
		type: string
		data: T
	}
}
