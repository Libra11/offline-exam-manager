/*
 * @Author: Libra
 * @Date: 2023-06-05 16:16:59
 * @LastEditors: Libra
 * @Description:
 */
import type { WebContents } from 'electron'
import type { Socket } from 'socket.io'
import { MessageType } from '../src/enum'
import { Server } from 'socket.io'
import { client_websocket_port } from './config'

const createSocket = (webContents: WebContents) => {
	const io = new Server()

	io.on('connection', (socket: Socket) => {
		console.log('socket connected')
		socket.on('disconnect', () => {
			console.log('socket disconnected', socket.id)
		})
		socket.on('message', (msg: any) => {
			if (msg.type === MessageType.ADMIN_CONNECT) {
				webContents.send('ip', JSON.stringify(msg.data))
			}
		})
	})
	io.listen(client_websocket_port)
}

export default createSocket
