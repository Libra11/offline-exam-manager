import type { IMessage } from 'myTypes'
import { sendExamZipFile, updateClients } from '../api/server'
import { discoverHosts, sendLocalIptoClient } from '../arp'
import createSocket from '../socket'
import type { BrowserWindow, IpcMain } from 'electron'

/*
 * @Author: Libra
 * @Date: 2023-09-01 11:01:56
 * @LastEditors: Libra
 * @Description: renderer thread send message to main thread
 */
const handleMsg = (ipcMain: IpcMain, win: BrowserWindow | null) => {
	ipcMain.on('message', (_, arg: string) => {
		const msg: IMessage<any> = JSON.parse(arg)
		switch (msg.type) {
			case 'FIND_CLIENTS':
				if (!win) return
				discoverHosts(win, msg.data)
				break
			case 'CONNECT_CLIENTS':
				const { localIp, clients } = msg.data
				sendLocalIptoClient(localIp, clients)
				break
			case 'CREATE_SERVER':
				if (!win) return
				createSocket(win)
				break
			case 'SEND_EXAM_FILE':
				sendExamZipFile()
				break
			case 'UPDATE_CLIENTS':
				updateClients()
				break
			default:
				break
		}
	})
}

export default handleMsg
