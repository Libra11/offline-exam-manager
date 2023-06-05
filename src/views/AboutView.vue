<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-06-05 14:58:58
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

let socket: Socket | null = null
let isSocketConnected = ref(false)
let hostIp: string = ''

onMounted(() => {
	ipcRenderer.on('ip', (event: IpcRendererEvent, ip: string) => {
		hostIp = ip
		console.log('hostIp', hostIp)
		if (!isSocketConnected.value) {
			connectSocket(hostIp)
		}
	})
})

const connectSocket = (hostIp: string) => {
	const manager = new Manager(`http://${hostIp}:${4001}`, {
		reconnection: true,
		reconnectionAttempts: 5,
		query: {
			id: hostIp,
		},
	})
	socket = manager.socket('/')

	// client-side
	socket.on('connect', () => {
		isSocketConnected.value = true
		ElMessage.success('连接socket成功')
	})

	manager.on('reconnect_attempt', () => {
		ElMessage.warning('socket重连中')
	})

	manager.on('reconnect_failed', () => {
		ElMessage.error('socket重连失败')
		// open a dialog to let user choose whether to reconnect
		// TODO
	})

	manager.on('reconnect', () => {
		ElMessage.success('socket重连成功')
	})

	manager.on('reconnect_error', (error: any) => {
		ElMessage.error('socket重连错误', error)
	})

	socket.on('disconnect', () => {
		isSocketConnected.value = false
		ElMessage.error('socket断开连接')
	})
}

const sendMessage = () => {
	socket && socket.emit('message', 'hello world')
}
</script>

<style></style>
