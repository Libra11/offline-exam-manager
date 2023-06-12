/*
 * @Author: Libra
 * @Date: 2023-05-30 10:44:24
 * @LastEditTime: 2023-06-12 16:50:38
 * @LastEditors: Libra
 * @Description:/*
 */
import path from 'path'
import { app, BrowserWindow, protocol } from 'electron'
import createSocket from './socket'
import remote from '@electron/remote/main'

remote.initialize()

app.commandLine.appendSwitch('ignore-certificate-errors')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{
		scheme: 'app',
		privileges: {
			secure: true,
			standard: true,
			corsEnabled: true,
			supportFetchAPI: true,
		},
	},
])

const isDev = process.env.VITE_DEV_SERVER_URL
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let mainWindow: BrowserWindow | null = null

// function createTray() {
// 	const tray = new Tray('./image/test.png')
// 	tray.setToolTip('Miguu')
// 	tray.on('click', () => {
// 		mainWindow && mainWindow.show()
// 	})
// }

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
		},
	})

	remote.enable(mainWindow.webContents)
	mainWindow.loadURL(isDev ? 'http://localhost:5174' : `file://${path.join(__dirname, '../dist/index.html')}`)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	createSocket(mainWindow.webContents)
}

app.whenReady().then(() => {
	// createTray()
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
