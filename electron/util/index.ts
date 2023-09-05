/*
 * @Author: Libra
 * @Date: 2023-05-17 10:01:30
 * @LastEditTime: 2023-06-13 09:42:32
 * @LastEditors: Libra
 * @Description: util
 */
import os from 'os'
import type { IMessage } from 'myTypes'
import type { Socket as SocketServer } from 'socket.io'
import type { BrowserWindow } from 'electron'

// socket send message
const sendMessage = (socket: SocketServer, message: IMessage<any>) => {
	socket.emit('message', message)
}

// main thread send message to render thread
const sendMainMessage = (win: BrowserWindow, message: IMessage<any>) => {
	win.webContents.send('message', message)
}

function getLocalIpAddress() {
	const interfaces = os.networkInterfaces()
	for (const devName in interfaces) {
		const iface = interfaces[devName]
		if (!iface) continue
		for (let i = 0; i < iface.length; i++) {
			const alias = iface[i]
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address
			}
		}
	}
}
export { getLocalIpAddress, sendMessage, sendMainMessage }
