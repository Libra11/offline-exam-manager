<!--
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-03-30 19:31:08
 * @LastEditors: Libra
 * @Description: 
-->
<template>
	<div class="about">
		<h1>This is an about page</h1>
		<input class="input-text" type="text" />
		<el-button type="primary">Primary</el-button>
		<custom-dialog />
	</div>
</template>

<script setup lang="ts">
import CustomDialog from '@/components/CustomDialog.vue'
</script>

<style></style>
