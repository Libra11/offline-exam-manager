/*
 * @Author: Libra
 * @Date: 2023-05-30 10:44:24
 * @LastEditTime: 2023-09-01 14:30:18
 * @LastEditors: Libra
 * @Description:/*
 */
import path from 'path'
import { app, BrowserWindow, ipcMain, Menu, powerSaveBlocker } from 'electron'
import handleMsg from './message/renderer2main'

const isDev = process.env.VITE_DEV_SERVER_URL
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
powerSaveBlocker.start('prevent-display-sleep')
let win: BrowserWindow | null = null
function createWindow() {
	Menu.setApplicationMenu(null)
	win = new BrowserWindow({
		width: 2200,
		height: 1200,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
		},
	})
	win.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`)
	if (isDev) {
		win.webContents.openDevTools()
	}
}

app.whenReady().then(() => {
	createWindow()
	// handle renderer thread message
	handleMsg(ipcMain, win)
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	app.quit()
})
