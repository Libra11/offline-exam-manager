/*
 * @Author: Libra
 * @Date: 2023-08-28 15:31:09
 * @LastEditors: Libra
 * @Description:
 */
import type { Socket } from 'socket.io'
import { updateClientInfo } from '../arp'
import type { BrowserWindow } from 'electron'
import type { IRequestMessage } from 'myTypes'

const handleApi = (message: IRequestMessage, callback: any, socket: Socket, win: BrowserWindow) => {
	// message.url
	switch (message.url) {
		case '/api/update/client/status':
			updateClientInfo(socket.handshake.query, win, message.query.onlineStatus)
			callback({
				code: 200,
				data: 'success',
				message: '更改客户端状态成功',
			})
			break
	}
}
export default handleApi
