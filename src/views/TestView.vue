<!--
 * @Author: Libra
 * @Date: 2023-08-18 10:30:53
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div>
		<DropArea :left-width="70" :right-width="29">
			<template #left>
				<div>left</div>
			</template>
			<template #right>
				<div>right</div>
			</template>
		</DropArea>
		<el-button type="primary" @click="openCalculatorDialog">打开计算器</el-button>
		<no-fixed-dialog
			class="!fixed left-5 bottom-0"
			:visible="dialogNoFixedVisible"
			title="计算器"
			:width="modelValue ? '20rem' : '32rem'"
			@update:visible="dialogNoFixedVisible = false"
		>
			<custom-calculator @update-model-value="getModelValue" />
		</no-fixed-dialog>
	</div>
</template>

<script setup lang="ts">
import DropArea from '@/components/DropArea.vue'
import CustomCalculator from '@/components/CustomCalculator.vue'
import NoFixedDialog from '@/components/NoFixedDialog.vue'
import { ref } from 'vue'

// 计算器
const dialogNoFixedVisible = ref(false)
const openCalculatorDialog = () => {
	dialogNoFixedVisible.value = true
}
let modelValue = ref(true)
const getModelValue = (value: boolean) => {
	modelValue.value = value
}
</script>

<style scoped></style>
