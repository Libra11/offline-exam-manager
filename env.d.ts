/*
 * @Author: Libra
 * @Date: 2023-06-12 18:08:43
 * @LastEditors: Libra
 * @Description:
 */
/// <reference types="vite/client" />

declare module 'animejs/lib/anime.es.js'

declare module 'myTypes' {
	interface ClientItem {
		ip: string
		os: string
		seatNum: number
		useStatus: 'free' | 'used'
		onlineStatus: 'online' | 'offline' | 'launched'
		version: string
	}
	type ServerMessageType = 'exam-file'
	interface RequestMessage {
		url: string
		query: Record<string, any>
	}
}
