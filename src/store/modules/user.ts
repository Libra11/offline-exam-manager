/*
 * @Author: Libra
 * @Date: 2022-04-01 17:00:50
 * @LastEditTime: 2023-03-22 18:20:20
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/src/store/modules/user.ts
 */
import { defineStore } from 'pinia'

interface IUserStore {
	token: string
}
export const UserStore = defineStore('user', {
	state: (): IUserStore => ({
		token: '',
	}),
	actions: {
		setName(token: string) {
			this.token = token
		},
	},
	getters: {
		getToken: (state) => state.token,
	},
	persist: {
		enabled: true,
	},
})
