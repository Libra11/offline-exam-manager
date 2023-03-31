<!--
 * @Author: Libra
 * @Date: 2023-03-30 18:29:45
 * @LastEditTime: 2023-03-30 19:30:39
 * @LastEditors: Libra
 * @Description: 全局弹窗组件 
-->
<template>
	<el-button @click="dialogVisible = true">打开</el-button>
	<el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
		<span>This is a message</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

const dialogVisible: Ref<boolean> = ref(false)

const handleClose = (done: () => void) => {
	done()
}
</script>

<style scoped></style>
