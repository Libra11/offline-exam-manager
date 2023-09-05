/*
 * @Author: Libra
 * @Date: 2023-05-16 17:12:25
 * @LastEditTime: 2023-09-01 13:29:11
 * @LastEditors: Libra
 * @Description:
 */
import { Server, Socket } from 'socket.io'
import { server_websocket_port } from '../config'
import { updateClientInfo } from '../arp'
import type { BrowserWindow } from 'electron'
import handleApi from '../api'
import type { IRequestMessage, ServerMessageType } from 'myTypes'
import { sendMessage } from '../util'

let io: Server | null = null
const sockets = new Map<string, Socket>()

const createSocket = (win: BrowserWindow) => {
	if (io) return
	io = new Server({
		/* options */
	})

	io.on('connection', (socket) => {
		console.log('socket connected', socket.id)
		// disconnect old socket if exists
		const ip = socket.handshake.query.ip as string
		const oldSocket = sockets.get(ip)
		oldSocket && oldSocket.disconnect()
		sockets.set(ip, socket)
		socket.on('disconnect', () => {
			console.log('socket disconnected', socket.id)
			sockets.delete(ip)
			updateClientInfo(socket.handshake.query, win, 'offline')
		})
		socket.on('request', (message: IRequestMessage, callback) => {
			console.log('socket message', message)
			handleApi(message, callback, socket, win)
		})
		socket.on('message', (message) => {
			console.log('socket message', message)
		})
	})
	io.listen(server_websocket_port)
}

// send message to all clients
export function sendMessageToClients(type: ServerMessageType, data: any) {
	sockets.forEach((socket) => {
		sendMessage(socket, {
			type,
			data,
		})
	})
}
export default createSocket
