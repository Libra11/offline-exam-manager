/*
 * @Author: Libra
 * @Date: 2023-03-22 10:31:03
 * @LastEditTime: 2023-08-28 15:01:13
 * @LastEditors: Libra
 * @Description: fetch 封装
 */
import { handleCode } from './code'
import { Manager, type Socket } from 'socket.io-client'
import { app } from '@electron/remote'
import { ElMessage } from 'element-plus'
import { isVisible } from '../../electron/main'

export type ResponseData<T> = {
	code: number
	data: T
	message: string
}
interface WebSocketFetchOptions {
	url: string
	headers?: Record<string, string>
	timeout?: number
}

let socket: Socket | null = null

function getClientVersion() {
	return ` V${app.getVersion()}`
}
export const connectSocket = (hostIp: string, localIp: string) => {
	// disconnect previous socket
	socket?.disconnect()
	const manager = new Manager(`http://${hostIp}:${4001}`, {
		reconnection: true,
		query: {
			ip: localIp,
			version: getClientVersion(),
		},
		reconnectionAttempts: 5,
	})
	socket = manager.socket('/')

	// client-side
	socket.on('connect', () => {
		fetch({
			url: 'update/client/status',
			headers: {
				onlineStatus: isVisible() ? 'online' : 'launched',
			},
		})
		ElMessage.success('socket connected')
	})

	manager.on('reconnect_attempt', () => {
		ElMessage.warning('socket reconnecting...')
	})

	manager.on('reconnect_failed', () => {
		ElMessage.error('socket reconnect failed')
		// open a dialog to let user choose whether to reconnect
		// TODO
	})

	manager.on('reconnect', () => {
		ElMessage.success('socket reconnect success')
	})

	manager.on('reconnect_error', (error: any) => {
		ElMessage.error('socket reconnect error', error)
	})

	socket.on('disconnect', () => {
		fetch({
			url: 'update/client/status',
			headers: {
				onlineStatus: 'offline',
			},
		})
		ElMessage.error('socket disconnected')
	})
}
// fetch use websocket
export async function fetch<T>(options: WebSocketFetchOptions): Promise<ResponseData<T>> {
	const { url, headers = {}, timeout = 10000 } = options
	const headersObj = {
		'Content-Type': 'application/json',
		...headers,
	}
	return new Promise((resolve, reject) => {
		if (!socket) {
			reject('socket is not connected')
		}
		socket?.emit(
			'message',
			{
				url,
				headers: headersObj,
				timeout,
			},
			(data: ResponseData<T>) => {
				if (data.code === 200) {
					resolve(data)
				} else {
					handleCode(data as ResponseData<string>)
					reject(data.message)
				}
			}
		)
	})
}
