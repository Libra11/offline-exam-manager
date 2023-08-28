<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-08-28 14:10:32
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="p-2">
		<el-tag class="mb-2">客户端</el-tag>
		<el-button type="primary" @click="test">测试</el-button>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ipcRenderer, type IpcRendererEvent } from 'electron'
import storage from '@/utils/storage'
import type { IP } from 'myTypes'
import { connectSocket, fetch } from '@/request'

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

const test = async () => {
	const a = await fetch<any>({
		url: '/test',
	})
	console.log(a)
}
</script>

<style></style>
