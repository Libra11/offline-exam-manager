<!--
 * @Author: Libra
 * @Date: 2023-03-31 16:04:23
 * @LastEditTime: 2023-03-31 17:07:07
 * @LastEditors: Libra
 * @Description:  计算器
-->
<template>
	<el-card>
		<div class="text-right">
			<div class="break-all" :style="{ fontSize: fontSize + 'px' }">
				{{ display }}
			</div>
		</div>
		<div class="flex">
			<div class="mr-2">
				<el-button
					v-for="button in advancedButtons"
					:key="button.value"
					:type="button.type as any"
					:class="button.class"
					size="small"
					@click="handleButtonClick(button.value)"
				>
					{{ button.label }}
				</el-button>
			</div>
			<div class="grid grid-cols-4 gap-2">
				<template v-for="button in basicButtons" :key="button.value">
					<el-button :type="button.type as any" :class="button.class" size="small" @click="handleButtonClick(button.value)">
						{{ button.label }}
					</el-button>
				</template>
			</div>
		</div>
	</el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const display = ref('')
const fontSize = ref(32)
const advancedButtons = computed(() => [
	{ label: '(', value: '(', type: 'text', class: 'bg-gray-400 text-black' },
	{ label: ')', value: ')', type: 'text', class: 'bg-gray-400 text-black' },
	{ label: 'π', value: 'Math.PI', type: 'text', class: 'bg-gray-400 text-black' },
	{ label: 'e', value: 'Math.E', type: 'text', class: 'bg-gray-400 text-black' },
	{ label: 'x²', value: 'x^2', type: 'text', class: 'bg-gray-400 text-black' },
])
const basicButtons = computed(() => [
	{ label: 'AC', value: 'AC', type: 'primary' },
	{ label: '+/-', value: '+/-', type: 'primary' },
	{ label: '%', value: '%', type: 'primary' },
	{ label: '÷', value: '/', type: 'primary', class: 'bg-yellow-500' },
	{ label: '7', value: '7', type: 'text', class: 'bg-gray-700' },
	{ label: '8', value: '8', type: 'text', class: 'bg-gray-700' },
	{ label: '9', value: '9', type: 'text', class: 'bg-gray-700' },
	{ label: '×', value: '*', type: 'primary', class: 'bg-yellow-500' },
	{ label: '4', value: '4', type: 'text', class: 'bg-gray-700' },
	{ label: '5', value: '5', type: 'text', class: 'bg-gray-700' },
	{ label: '6', value: '6', type: 'text', class: 'bg-gray-700' },
	{ label: '−', value: '-', type: 'primary', class: 'bg-yellow-500' },
	{ label: '1', value: '1', type: 'text', class: 'bg-gray-700' },
	{ label: '2', value: '2', type: 'text', class: 'bg-gray-700' },
	{ label: '3', value: '3', type: 'text', class: 'bg-gray-700' },
	{ label: '+', value: '+', type: 'primary' },
	{ label: '0', value: '0', type: 'text', class: 'bg-gray-700' },
	{ label: '.', value: '.', type: 'text', class: 'bg-gray-700' },
	{ label: '=', value: '=', type: 'primary', class: 'bg-yellow-500' },
])

const handleButtonClick = (value: string) => {
	switch (value) {
		case 'AC':
			display.value = ''
			break
		case '+/-':
			if (display.value) {
				display.value = display.value.startsWith('-') ? display.value.substring(1) : '-' + display.value
			}
			break
		case '%':
			if (display.value) {
				try {
					// eslint-disable-next-line no-eval
					display.value = (eval(display.value) / 100).toString()
				} catch (error) {
					display.value = '错误'
				}
			}
			break
		case '=':
			if (display.value) {
				try {
					// eslint-disable-next-line no-eval
					display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/')).toString()
				} catch (error) {
					display.value = '错误'
				}
			}
			break
		case 'x^2':
			if (display.value) {
				try {
					// eslint-disable-next-line no-eval
					display.value = (eval(display.value) ** 2).toString()
				} catch (error) {
					display.value = '错误'
				}
			}
			break
		default:
			if (value === '/') {
				display.value += '÷'
			} else {
				display.value += value
			}
			break
	}
	// 动态调整字体大小
	if (display.value.length > 8) {
		fontSize.value = 32 - (display.value.length - 8) * 2
	} else {
		fontSize.value = 32
	}
}
</script>
