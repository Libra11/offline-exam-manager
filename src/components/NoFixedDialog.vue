<!--
 * @Author: Libra
 * @Date: 2023-08-18 15:05:48
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<transition name="pop">
		<div
			v-show="props.visible"
			ref="modal"
			:style="`width: ${width}; height: ${height};`"
			class="transition-width fixed overflow-hidden rounded-sm bg-white"
			:class="`${isDark ? 'dark-shadow' : 'light-shadow'}`"
		>
			<header class="header flex cursor-move items-center justify-between p-4" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
				<div class="title text-lg">
					{{ props.title }}
				</div>
				<div class="close-btn hover:text-primary h-7 w-7 cursor-pointer transition-colors" @click.prevent="handleClose" />
			</header>
			<div class="body flex-1 p-4">
				<slot />
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { isDark } from '@/composables/useDark'
import { reactive, ref } from 'vue'
const props = defineProps({
	width: {
		type: String,
		default: '40rem',
	},
	height: {
		type: String,
		default: '30rem',
	},
	visible: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: '标题',
	},
})

const state = reactive({
	x: 0,
	y: 0,
	width: `${props.width}px`,
	height: `${props.height}px`,
	isDragging: false,
})

const emit = defineEmits(['update:visible'])

function handleClose() {
	emit('update:visible', false)
}

const modal = ref<HTMLElement>()
function handleMouseDown(event: MouseEvent) {
	state.isDragging = true
	state.x = event.offsetX
	state.y = event.offsetY
	document.addEventListener('mousemove', handleMouseMove)
}

function handleMouseMove(event: MouseEvent) {
	if (!modal.value) return
	if (state.isDragging) {
		modal.value.style.left = `${event.clientX - state.x}px`
		modal.value.style.top = `${event.clientY - state.y}px`
	}
}

function handleMouseUp() {
	state.isDragging = false
	document.removeEventListener('mousemove', () => {})
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
	transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
	opacity: 0;
	transform: scale(0.3) translateY(-50%);
}

.pop-enter-to,
.pop-leave-from {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.dark-shadow {
	box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px rgba(0, 0, 0, 0.72);
}

.light-shadow {
	box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
