/*
 * @Author: Libra
 * @Date: 2023-05-30 10:44:24
 * @LastEditTime: 2023-08-28 14:56:02
 * @LastEditors: Libra
 * @Description:/*
 */
import path from 'path'
import { app, BrowserWindow, protocol, Tray, powerSaveBlocker } from 'electron'
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
powerSaveBlocker.start('prevent-display-sleep')
let mainWindow: BrowserWindow | null = null
let isHide = true

function createTray() {
	const tray = new Tray('electron/image/test.png')
	tray.on('click', () => {
		isHide ? mainWindow?.show() : mainWindow?.hide()
		isHide = !isHide
	})
	tray.setToolTip('国考云')
}

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

	mainWindow.hide()
	remote.enable(mainWindow.webContents)
	mainWindow.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	createSocket(mainWindow.webContents)
}

app.whenReady().then(() => {
	createTray()
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

export const isVisible = () => {
	return mainWindow?.isVisible()
}
