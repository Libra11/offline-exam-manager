/*
 * @Author: Libra
 * @Date: 2023-08-28 15:31:09
 * @LastEditors: Libra
 * @Description:
 */
import type { Socket } from 'socket.io'
import { updateClientInfo } from '../arp'
import type { WebContents } from 'electron'
import type { RequestMessage } from 'myTypes'

const handleApi = (message: RequestMessage, callback: any, socket: Socket, webContents: WebContents) => {
	// message.url
	switch (message.url) {
		case '/api/update/client/status':
			updateClientInfo(socket.handshake.query, webContents, message.query.onlineStatus)
			callback({
				code: 200,
				data: 'success',
				message: '更改客户端状态成功',
			})
			break
	}
}
export default handleApi
