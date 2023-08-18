<!--
 * @Author: Libra
 * @Date: 2023-08-18 10:17:57
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="flex-c area-container h-full w-full border">
		<div class="left h-60 p-2" :style="{ width: leftWidth + '%' }">
			<div>
				<div v-if="status === 'left'" @click="narrow()">缩小</div>
				<div v-else @click="enlarge(true)">放大</div>
			</div>
			<div v-if="status === 'right'">三个字</div>
			<slot v-else name="left"></slot>
		</div>
		<div class="h-60 w-[1%] bg-black" ref="drag" @mousedown="startDrag"></div>
		<div class="right h-60 p-2" :style="{ width: rightWidth + '%' }">
			<div>
				<div v-if="status === 'right'" @click="narrow()">缩小</div>
				<div v-else @click="enlarge(false)">放大</div>
			</div>
			<div v-if="status === 'left'">三个字</div>
			<slot v-else name="right"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const props = defineProps({
	leftWidth: {
		type: Number,
		default: 40,
	},
	rightWidth: {
		type: Number,
		default: 59,
	},
})

type IStatus = 'left' | 'right' | 'middle'

const leftWidth = ref(props.leftWidth)
const rightWidth = ref(props.rightWidth)
const isDragging = ref(false)
const drag = ref()
const status: Ref<IStatus> = ref('middle')

const startDrag = () => {
	isDragging.value = true
}

const handleDrag = (e: MouseEvent) => {
	if (isDragging.value) {
		const container = document.querySelector('.area-container') as HTMLElement
		const containerWidth = container.offsetWidth
		const leftWidthValue = (e.clientX / containerWidth) * 100
		const rightWidthValue = 100 - leftWidthValue
		if (leftWidthValue < 10) {
			isDragging.value = false
			status.value = 'right'
		} else if (rightWidthValue < 10) {
			isDragging.value = false
			status.value = 'left'
		} else {
			status.value = 'middle'
			leftWidth.value = leftWidthValue
			rightWidth.value = rightWidthValue
		}
	}
}

const stopDrag = () => {
	isDragging.value = false
}

// 放大
const enlarge = (isLeft: boolean) => {
	if (isLeft) {
		anime({
			targets: '.left',
			width: '89%',
			duration: 500,
			easing: 'easeInOutQuad',
		})
		anime({
			targets: '.right',
			width: '10%',
			duration: 500,
			easing: 'easeInOutQuad',
		})
		setTimeout(() => {
			leftWidth.value = 89
			rightWidth.value = 10
		}, 500)
		status.value = 'left'
	} else {
		anime({
			targets: '.left',
			width: '10%',
			duration: 500,
			easing: 'easeInOutQuad',
		})
		anime({
			targets: '.right',
			width: '89%',
			duration: 500,
			easing: 'easeInOutQuad',
		})
		setTimeout(() => {
			leftWidth.value = 10
			rightWidth.value = 89
		}, 500)
		status.value = 'right'
	}
}

// 缩小
const narrow = () => {
	status.value = 'middle'
	anime({
		targets: '.left',
		width: `${props.leftWidth}%`,
		duration: 500,
		easing: 'easeInOutQuad',
	})
	anime({
		targets: '.right',
		width: `${props.rightWidth}%`,
		duration: 500,
		easing: 'easeInOutQuad',
	})
	setTimeout(() => {
		leftWidth.value = props.leftWidth
		rightWidth.value = props.rightWidth
	}, 500)
}

onMounted(() => {
	document.addEventListener('mousemove', handleDrag)
	document.addEventListener('mouseup', stopDrag)
})

onUnmounted(() => {
	document.removeEventListener('mousemove', handleDrag)
	document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped></style>
