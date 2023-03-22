/*
 * @Author: Libra
 * @Date: 2023-03-22 11:35:57
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/src/request/index.spec.ts
 */
import { describe, it, expect } from 'vitest'
import { getOptions } from './index'

describe('fetch', () => {
	it('getOptions', () => {
		expect(getOptions({ method: 'POST' })).toEqual({
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: '',
			},
		})
		expect(getOptions()).toEqual({
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: '',
			},
		})
		// have token
		localStorage.setItem('token', '123')
		expect(getOptions()).toEqual({
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer 123',
			},
		})
	})
})
