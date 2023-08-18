<!--
 * @Author: Libra
 * @Date: 2023-08-18 15:06:30
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="box-content rounded-md font-['digital']">
		<el-button @click="changeModeEvent" class="toggle-el-button">
			<div v-if="changeMode">切换高级模式 ⚈</div>
			<div v-else>切换简单模式 ⚆</div>
		</el-button>
		<div class="flex-br mb-5 h-28 w-full">
			<div class="self-end !text-5xl">{{ current }}</div>
		</div>
		<div class="grid grid-cols-4 gap-y-3 gap-x-3" v-if="changeMode">
			<el-button type="info" class="key" @click="press">AC</el-button>
			<el-button type="info" class="key" @click="press">x 2</el-button>
			<el-button type="info" class="key" @click="press">%</el-button>
			<el-button type="primary" class="key" @click="press">÷</el-button>
			<el-button class="key" @click="press">7</el-button>
			<el-button class="key" @click="press">8</el-button>
			<el-button class="key" @click="press">9</el-button>
			<el-button type="primary" class="key" @click="press">×</el-button>
			<el-button class="key" @click="press">4</el-button>
			<el-button class="key" @click="press">5</el-button>
			<el-button class="key" @click="press">6</el-button>
			<el-button type="primary" class="key" @click="press">-</el-button>
			<el-button class="key" @click="press">1</el-button>
			<el-button class="key" @click="press">2</el-button>
			<el-button class="key" @click="press">3</el-button>
			<el-button type="primary" class="key" @click="press">+</el-button>
			<el-button class="key col-span-2" @click="press">0</el-button>
			<el-button class="key" @click="press">.</el-button>
			<el-button type="primary" class="key" @click="press">=</el-button>
		</div>
		<div v-else class="flex-c">
			<div class="mr-6 grid grid-cols-4 gap-y-3 gap-x-3">
				<el-button class="key" @click="press">√</el-button>
				<el-button class="key" @click="press">x 2</el-button>
				<el-button class="key" @click="press">x^</el-button>
				<el-button class="key" @click="press">°</el-button>
				<el-button class="key" @click="press">sin</el-button>
				<el-button class="key" @click="press">cos</el-button>
				<el-button class="key" @click="press">tan</el-button>
				<el-button class="key" @click="press">&lt;=</el-button>
				<el-button class="key" @click="press">log</el-button>
				<el-button class="key" @click="press">ln</el-button>
				<el-button class="key" @click="press">e</el-button>
				<el-button class="key" @click="press">rad</el-button>
				<el-button class="key" @click="press">±</el-button>
				<el-button class="key" @click="press">x !</el-button>
				<el-button class="key" @click="press">(</el-button>
				<el-button class="key" @click="press">)</el-button>
				<el-button class="key" @click="press">π</el-button>
			</div>
			<div class="grid grid-cols-4 gap-y-3 gap-x-3">
				<el-button type="info" class="key col-span-2" @click="press">AC</el-button>
				<el-button type="info" class="key" @click="press">%</el-button>
				<el-button type="primary" class="key" @click="press">÷</el-button>
				<el-button class="key" @click="press">7</el-button>
				<el-button class="key" @click="press">8</el-button>
				<el-button class="key" @click="press">9</el-button>
				<el-button type="primary" class="key" @click="press">×</el-button>
				<el-button class="key" @click="press">4</el-button>
				<el-button class="key" @click="press">5</el-button>
				<el-button class="key" @click="press">6</el-button>
				<el-button type="primary" class="key" @click="press">-</el-button>
				<el-button class="key" @click="press">1</el-button>
				<el-button class="key" @click="press">2</el-button>
				<el-button class="key" @click="press">3</el-button>
				<el-button type="primary" class="key" @click="press">+</el-button>
				<el-button class="key col-span-2" @click="press">0</el-button>
				<el-button class="key" @click="press">.</el-button>
				<el-button type="primary" class="key" @click="press">=</el-button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'

let current: Ref<any> = ref('')
let changeMode = ref(true)

let emits = defineEmits(['updateModelValue'])

let press = (event: any) => {
	const key = event.target.textContent
	if (
		key !== '=' &&
		key !== 'AC' &&
		key !== '×' &&
		key !== '÷' &&
		key !== '√' &&
		key !== 'x 2' &&
		key !== '%' &&
		key !== '<=' &&
		key !== '±' &&
		key !== 'sin' &&
		key !== 'cos' &&
		key !== 'tan' &&
		key !== 'log' &&
		key !== 'ln' &&
		key !== 'x^' &&
		key !== 'x !' &&
		key !== 'π' &&
		key !== 'e' &&
		key !== 'rad' &&
		key !== '°'
	) {
		current.value += key
	} else if (key === '=') {
		current.value = current.value.replaceAll('×', '*').replaceAll('÷', '/')
		console.log(current.value)
		if (current.value.indexOf('^') > -1) {
			const base = current.value.slice(0, current.value.indexOf('^'))
			const exponent = current.value.slice(current.value.indexOf('^') + 1)
			// eslint-disable-next-line no-eval
			current.value = eval('Math.pow(' + base + ',' + exponent + ')')
		} else {
			// eslint-disable-next-line no-eval
			current.value = eval(current.value)
		}
	} else if (key === 'AC') {
		current.value = ''
	} else if (key === '×') {
		current.value += '×'
	} else if (key === '÷') {
		current.value += '÷'
	} else if (key === '+') {
		current.value += '+'
	} else if (key === '-') {
		current.value += '-'
	} else if (key === '±') {
		if (current.value.charAt(0) === '-') {
			current.value = current.value.slice(1)
		} else {
			current.value = '-' + current.value
		}
	} else if (key === '<=') {
		current.value = current.value.substring(0, current.value.length - 1)
	} else if (key === '%') {
		current.value = current.value / 100
	} else if (key === 'π') {
		current.value = current.value * Math.PI
	} else if (key === 'x 2') {
		// eslint-disable-next-line no-eval
		current.value = eval(String(current.value * current.value))
	} else if (key === '√') {
		current.value = Math.sqrt(current.value)
	} else if (key === 'sin') {
		current.value = Math.sin(current.value)
	} else if (key === 'cos') {
		current.value = Math.cos(current.value)
	} else if (key === 'tan') {
		current.value = Math.tan(current.value)
	} else if (key === 'log') {
		current.value = Math.log10(current.value)
	} else if (key === 'ln') {
		current.value = Math.log(current.value)
	} else if (key === 'x^') {
		current.value += '^'
	} else if (key === 'x !') {
		if (current.value === 0) {
			current.value = '1'
		} else if (current.value < 0) {
			current.value = NaN
		} else {
			let number = 1
			for (let i = current.value; i > 0; i--) {
				number *= i
			}
			current.value = number
		}
	} else if (key === 'e') {
		current.value = Math.exp(current.value)
	} else if (key === 'rad') {
		current.value = current.value * (Math.PI / 180)
	} else if (key === '°') {
		current.value = current.value * (180 / Math.PI)
	}
}
let changeModeEvent = () => {
	changeMode.value = !changeMode.value
	emits('updateModelValue', changeMode.value)
}
</script>

<style lang="scss">
.key {
	margin-left: 0 !important;
	font-size: 1rem;
}
</style>
