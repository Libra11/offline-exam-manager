<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-03-31 16:57:22
 * @LastEditors: Libra
 * @Description: App.vue
-->
<script setup lang="ts">
import { toggleDark } from '@/composables/useDark'
import { RouterView } from 'vue-router'
import { memberInfo } from './api'
import { ElMessage } from 'element-plus'
// import CustomHeader from '@/components/CustomHeader.vue'

const getInfo = async () => {
	const res = await memberInfo()
	if (res.code === 200) {
		ElMessage.success(res.message)
	}
}
</script>

<template>
	<header>
		<div class="wrapper no-animation">
			<!-- <custom-header /> -->
			<el-button type="primary" @click="toggleDark()">Toggle Dark Mode</el-button>
			<el-button @click="getInfo()">getInfo</el-button>
			<div class="text-lg font-light">test tailwindcss</div>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss"></style>
