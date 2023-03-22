/*
 * @Author: Libra
 * @Date: 2023-03-22 18:26:39
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/src/composables/useToken.ts
 */
// src/composables/useToken.ts
import { UserStore } from '@/store/modules/user'
import { computed } from 'vue'
import type { Ref } from 'vue'

export function useToken(): Ref<string> {
	const userStore = UserStore()
	const token = computed(() => userStore.token)
	return token
}
