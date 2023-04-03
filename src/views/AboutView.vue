<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-03-31 16:08:37
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="about">
		<h1>This is an about page</h1>
		<input class="input-text" type="text" />
		<el-button type="primary" @click="openDialog">打开弹窗</el-button>
		<custom-dialog v-model:model-value="dialogVisible" :show-close="true" :confirm-delay="9" :use-default-footer="false" @confirm="confirm">
			<p>这是一段描述内容。</p>
		</custom-dialog>
		<custom-calculator />
	</div>
</template>

<script setup lang="ts">
import CustomDialog from '@/components/CustomDialog.vue'
import CustomCalculator from '@/components/CustomCalculator.vue'
import { ref } from 'vue'

const dialogVisible = ref(false)

const openDialog = () => {
	dialogVisible.value = true
}

const confirm = () => {
	// console.log('confirm')
}
</script>

<style></style>
