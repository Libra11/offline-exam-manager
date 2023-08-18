/*
 * @Author: Libra
 * @Date: 2023-06-05 16:16:59
 * @LastEditors: Libra
 * @Description:
 */
import { app, type WebContents } from 'electron'
import type { Socket } from 'socket.io'
import { MessageType } from '../src/enum'
import { Server } from 'socket.io'
import { client_websocket_port } from './config'
import type { IMessage, IP } from 'myTypes'
import os from 'os'

const createSocket = (webContents: WebContents) => {
	const io = new Server()

	io.on('connection', (socket: Socket) => {
		// tell server my status
		tellMyStatus(socket)
		socket.on('disconnect', () => {
			console.log('socket disconnected', socket.id)
		})
		socket.on('message', (msg: IMessage<IP>) => {
			if (msg.type === MessageType.ADMIN_CONNECT) {
				webContents.send('ip', JSON.stringify(msg.data))
			}
		})
	})
	io.listen(client_websocket_port)
}

const tellMyStatus = (socket: Socket) => {
	socket.emit('message', {
		type: MessageType.CLIENT_STATUS,
		data: {
			useStatus: '测试状态',
			version: app.getVersion(),
			os: os.release(),
		},
	})
}

export default createSocket
