/*
 * @Author: Libra
 * @Date: 2023-03-22 15:47:47
 * @LastEditors: Libra
 * @Description:返回码
 * @FilePath: /libra-vue3-all-in-one-template/src/request/code.ts
 */
import type { ResponseData } from '.'
import { ElMessage } from 'element-plus'

const code = {
	// 登录失败
	LOGIN_FAIL: 1005,
}

export function handleCode(res: ResponseData<string>) {
	switch (res.code) {
		case code.LOGIN_FAIL:
			// 登录失败
			ElMessage.error('登录失败')
			break
		default:
			ElMessage.error(res.message)
			break
	}
}
