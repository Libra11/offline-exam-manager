/*
 * @Author: Libra
 * @Date: 2023-05-30 10:44:24
 * @LastEditTime: 2023-06-05 14:30:02
 * @LastEditors: Libra
 * @Description:/*
 */
import path from 'path'
import { app, BrowserWindow } from 'electron'

const isDev = process.env.VITE_DEV_SERVER_URL
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
		},
	})

	mainWindow.loadURL(isDev ? 'http://localhost:5174' : `file://${path.join(__dirname, '../dist/index.html')}`)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	app.quit()
})
