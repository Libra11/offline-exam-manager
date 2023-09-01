/*
 * @Author: Libra
 * @Date: 2023-06-13 16:40:44
 * @LastEditors: Libra
 * @Description:
 */
import type { ClientItem } from 'myTypes'
import db from '.'
import type { IndexableType } from 'dexie'
interface Clients {
	getAllClient(): Promise<ClientItem[]>
	// eslint-disable-next-line no-unused-vars
	addClient(client: ClientItem): Promise<IndexableType>
	// eslint-disable-next-line no-unused-vars
	updateClient(client: ClientItem): Promise<IndexableType>
}
const clients: Clients = {
	async getAllClient() {
		return db.clients.toArray()
	},
	async addClient(client: ClientItem) {
		return db.clients.add(client)
	},
	async updateClient(client: ClientItem) {
		return db.clients.update(client.ip, client)
	},
}
export default clients
