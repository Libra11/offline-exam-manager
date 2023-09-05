/*
 * @Author: Libra
 * @Date: 2023-08-31 13:51:23
 * @LastEditors: Libra
 * @Description:
 */
/*
 * @Author: Libra
 * @Date: 2023-06-14 14:43:30
 * @LastEditors: Libra
 * @Description:
 */
import clients from '@/db/client'
import type { ClientItem } from 'myTypes'
import { defineStore } from 'pinia'

export const ClientStore = defineStore({
	id: 'pure-client',
	state: () => ({
		data: Array<ClientItem>(),
		allClientNum: 0,
		onlineClientNum: 0,
	}),
	actions: {
		async insertData(data: ClientItem) {
			try {
				await clients.addClient(data)
			} catch (error) {
				console.error(error)
			}
		},

		async getAllData() {
			this.data = await clients.getAllClient()
			this.allClientNum = this.data.length
		},
		async updateData(data: ClientItem) {
			console.log('host-update')
			this.data.map((item: ClientItem) => {
				if (item.ip === data.ip) {
					item.onlineStatus = data.onlineStatus
					item.version = data.version
				}
				return item
			})
			this.onlineClientNum = this.data.filter((item: ClientItem) => item.onlineStatus === 'online').length
			// update db
			clients.updateClient(data)
		},
	},
})
