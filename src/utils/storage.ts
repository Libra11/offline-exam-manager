/*
 * @Author: Libra
 * @Date: 2023-08-16 10:26:17
 * @LastEditors: Libra
 * @Description:
 */
export default class storage {
	static setItem(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value))
	}

	static getItem<T>(key: string): T | null {
		const value = localStorage.getItem(key)
		if (value) {
			return JSON.parse(value) as T
		}
		return null
	}

	static removeItem(key: string): void {
		localStorage.removeItem(key)
	}

	static clear(): void {
		localStorage.clear()
	}
}
