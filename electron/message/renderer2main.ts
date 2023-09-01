import { sendExamZipFile } from '@ele/api/server'
import { discoverHosts, sendLocalIptoClient } from '@ele/arp'
import createSocket from '@ele/socket'
import type { BrowserWindow, IpcMain } from 'electron'

/*
 * @Author: Libra
 * @Date: 2023-09-01 11:01:56
 * @LastEditors: Libra
 * @Description: renderer thread send message to main thread
 */
const handleMsg = (ipcMain: IpcMain, win: BrowserWindow | null) => {
	ipcMain.on('message', (event, arg) => {
		switch (arg.type) {
			case 'find-clients':
				if (!win) return
				discoverHosts(win.webContents, JSON.parse(arg.message))
				break
			case 'connect-clients':
				const { localIp, clients } = JSON.parse(arg.message)
				sendLocalIptoClient(localIp, clients)
				break
			case 'create-server':
				if (!win) return
				createSocket(win.webContents)
			case 'send-exam-file':
				sendExamZipFile()
			default:
				break
		}
	})
}

export default handleMsg
