/*
 * @Author: Libra
 * @Date: 2023-03-22 10:31:03
 * @LastEditors: Libra
 * @Description:封装 fetch
 * @FilePath: /libra-vue3-all-in-one-template/src/request/index.ts
 */
import { config } from '@/api/config'
import { useToken } from '@/composables/useToken'
import { handleCode } from './code'

export type ResponseData<T> = {
	code: number
	data: T
	message: string
}

type Base = 'EXAM' | 'OJ'

export function getOptions(option?: RequestInit): RequestInit {
	const token = useToken().value
	// 设置默认值
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		},
	}
	return { ...defaultOptions, ...option }
}

export default async <T>(url: string, baseUrl: Base = 'EXAM', option?: RequestInit): Promise<ResponseData<T>> => {
	const newOption = getOptions(option)
	const newUrl = config[baseUrl] + url
	try {
		const response = await fetch(newUrl, newOption)
		const res = await response.json()
		handleCode(res)
		return res
	} catch (error) {
		return Promise.reject(error)
	}
}
