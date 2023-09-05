import Koa from 'koa'
import path from 'path'
import serve from 'koa-static'
import { server_http_port } from '../config'

const createHttpServer = () => {
	const app = new Koa()

	// 静态文件目录
	const staticPath = 'static'
	console.log(path.join(__dirname, staticPath))
	app.use(serve('static'))

	app.listen(server_http_port, () => {
		console.log(`Server is running at http://localhost:${server_http_port}`)
	})
}

export { createHttpServer }
