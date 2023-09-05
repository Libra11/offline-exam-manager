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
	type ServerMessageType = 'UPDATE_CLIENTS' | 'EXAM_FILE' | 'IP'

	type ClientMessageType = 'CLIENT_STATUS'

	type MainMessageType = 'HOST' | 'UPDATE_CLIENT_INFO'

	type RenderMessageType = 'FIND_CLIENTS' | 'CREATE_SERVER' | 'SEND_EXAM_FILE' | 'UPDATE_CLIENTS' | 'CONNECT_CLIENTS'

	// server and client common message
	// main thread and render thread common message
	export interface IMessage<T> {
		type: ServerMessageType | ClientMessageType | MainMessageType | RenderMessageType
		data: T
	}
	/**
	 *  socket event
	 * 'request': through url to request(websocket)
	 * 'message': through socket to send message
	 */
	type SocketEvent = 'message' | 'request'

	/**
	 *  main thread and render thread common event
	 * 'message': through webContents to send message
	 */
	type ThreadEvent = 'message'

	// socket request message type
	export interface IRequestMessage {
		url: string
		query: Record<string, any>
	}
}
