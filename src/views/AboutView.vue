<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-08-18 10:12:11
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="p-2">
		<el-tag class="mb-2">客户端</el-tag>
		<div class="mb-2">
			<el-tag>连接状态:{{ isSocketConnected ? '已连接' : '已断开' }}</el-tag>
		</div>
		<el-button type="primary" @click="sendMessage()">向服务器发送消息</el-button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Manager, Socket } from 'socket.io-client'
import { ElMessage } from 'element-plus'
import { ipcRenderer, type IpcRendererEvent } from 'electron'
import { app } from '@electron/remote'
import storage from '@/utils/storage'
import type { IP } from 'myTypes'

let socket: Socket | null = null
let isSocketConnected = ref(false)
let hostIp: string = ''

onMounted(() => {
	const ip = storage.getItem<IP>('ip')
	ip && connectSocket(ip.serverIp, ip.localIp)
	ipcRenderer.on('ip', (event: IpcRendererEvent, ip: string) => {
		const ipObj = JSON.parse(ip)
		hostIp = ipObj.serverIp
		storage.setItem('ip', ip)
		const localIp = ipObj.localIp
		connectSocket(hostIp, localIp)
	})
})

function getClientVersion() {
	return ` V${app.getVersion()}`
}

const connectSocket = (hostIp: string, localIp: string) => {
	// disconnect previous socket
	socket?.disconnect()
	const manager = new Manager(`http://${hostIp}:${4001}`, {
		reconnection: true,
		query: {
			ip: localIp,
			version: getClientVersion(),
		},
		reconnectionAttempts: 5,
	})
	socket = manager.socket('/')

	// client-side
	socket.on('connect', () => {
		isSocketConnected.value = true
		ElMessage.success('连接socket成功')
	})

	manager.on('reconnect_attempt', () => {
		ElMessage.warning('socket reconnecting...')
	})

	manager.on('reconnect_failed', () => {
		ElMessage.error('socket reconnect failed')
		// open a dialog to let user choose whether to reconnect
		// TODO
	})

	manager.on('reconnect', () => {
		ElMessage.success('socket reconnect success')
	})

	manager.on('reconnect_error', (error: any) => {
		ElMessage.error('socket reconnect error', error)
	})

	socket.on('disconnect', () => {
		isSocketConnected.value = false
		ElMessage.error('socket disconnected')
	})
}

const sendMessage = () => {
	socket && socket.emit('message', 'hello world')
}
</script>

<style></style>
