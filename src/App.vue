<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { RouterView } from 'vue-router'
import { memberInfo } from './api'
import { ElMessage } from 'element-plus'

const isDark = useDark()
let toggleDark = useToggle(isDark),
	size = ref<'default' | 'large' | 'small'>('default'),
	value1 = ref('')

const getInfo = async () => {
	const res = await memberInfo()
	if (res.code === 200) {
		ElMessage.success(res.message)
	}
}
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

		<div class="wrapper no-animation">
			<el-button type="primary" @click="toggleDark()">Toggle Dark Mode</el-button>
			{{ isDark }}
			<el-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
			<el-button @click="getInfo()">getInfo</el-button>
			<div class="text-lg font-light">test tailwindcss</div>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss"></style>
