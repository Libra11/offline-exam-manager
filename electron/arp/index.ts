/*
 * @Author: Libra
 * @Date: 2023-05-17 09:44:22
 * @LastEditTime: 2023-09-01 14:33:23
 * @LastEditors: Libra
 * @Description: arp
 */
import { getLocalIpAddress, sendMainMessage } from '../util'
import io, { Socket } from 'socket.io-client'
import { client_websocket_port } from '../config'
import type { BrowserWindow } from 'electron'
import find from 'local-devices'
import type { IDevice } from 'local-devices'
import type { ClientItem, IMessage } from 'myTypes'

const sockets = new Map<string, Socket>()

interface Host {
	ip: string
	localIP: string
}

function discoverHosts(win: BrowserWindow, ipObj: any) {
	const localIP = getLocalIpAddress()
	if (!localIP) return
	const subnet = ipObj.first + '.' + ipObj.second + '.' + ipObj.third
	find({
		address: `${subnet}.${ipObj.fourthStart}-${subnet}.${ipObj.fourthEnd}`,
		skipNameResolution: true,
	}).then((devices: Array<IDevice>) => {
		devices.forEach((device: IDevice) => {
			const host: Host = { ip: device.ip, localIP }
			notifyClients(host, win)
		})
	})
}

const sendMessageToClients = (socket: Socket, message: IMessage<any>) => {
	socket.emit('message', {
		type: message.type,
		data: message.data,
	})
}

export function sendLocalIptoClient(localIp: string, clients: Array<string>) {
	clients.forEach((ip) => {
		const socket = sockets.get(ip)
		if (!socket) return
		sendMessageToClients(socket, {
			type: 'IP',
			data: {
				serverIp: localIp,
				localIp: ip,
			},
		})
	})
}

function notifyClients(host: Host, win: BrowserWindow) {
	const socket = io(`http://${host.ip}:${client_websocket_port}`)
	socket.on('error', (err) => {
		console.log('socket error', err)
	})
	socket.on('connect', () => {
		console.log('socket connected')
		// disconnect old socket if exists
		const oldSocket = sockets.get(host.ip)
		oldSocket && oldSocket.disconnect()
		sockets.set(host.ip, socket)
	})
	socket.on('disconnect', () => {
		console.log('socket disconnected')
	})
	socket.on('message', (message: IMessage<any>) => {
		console.log(message)
		if (message.type === 'CLIENT_STATUS') {
			const { useStatus, version, os } = message.data
			const h: ClientItem = {
				os,
				ip: host.ip,
				seatNum: 0,
				onlineStatus: 'offline',
				version,
				useStatus: useStatus,
			}
			sendMainMessage(win, {
				type: 'HOST',
				data: h,
			})
		}
	})
}

export function updateClientInfo(data: any, win: BrowserWindow, onlineStatus: string) {
	const { ip, version } = data
	const clientInfo = {
		ip,
		onlineStatus,
		version,
	}
	sendMainMessage(win, {
		type: 'UPDATE_CLIENT_INFO',
		data: clientInfo,
	})
}
export { discoverHosts }
