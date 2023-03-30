/*
 * @Author: Libra
 * @Date: 2023-03-22 10:14:24
 * @LastEditTime: 2023-03-30 18:48:40
 * @LastEditors: Libra
 * @Description: 测试环境和生产环境配置文件
 */
type service = {
	EXAM: string
	OJ: string
}

const dev_url: string = 'https://test-api.stac.fun/'
const dev_file_url: string = 'https://file-test.stac.fun/'
const dev_service: service = {
	EXAM: `${dev_url}exam/api`,
	OJ: `${dev_url}oj/api`,
}

const exam_prod_url: string = 'https://exam-api.iguokao.com/'
const oj_prod_url: string = 'https://oj-api.iguokao.com/'
const pro_file_url: string = 'https://exam-file.iguokao.com/'
const prod_server: service = {
	EXAM: `${exam_prod_url}api`,
	OJ: `${oj_prod_url}api`,
}

let config: service
let file_host: string

switch (process.env.NODE_ENV) {
	case 'development':
		config = dev_service
		file_host = dev_file_url
		break
	case 'production':
		config = prod_server
		file_host = pro_file_url
		break
	default:
		break
}
export { file_host, config }
