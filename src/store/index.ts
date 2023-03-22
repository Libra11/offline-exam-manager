/*
 * @Author: Libra
 * @Date: 2022-04-01 16:58:00
 * @LastEditTime: 2022-04-19 15:32:23
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /stone-interview-ui/src/store/index.ts
 */
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
export default createPinia().use(piniaPersist)
