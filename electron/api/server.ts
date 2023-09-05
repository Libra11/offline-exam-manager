/*
 * @Author: Libra
 * @Date: 2023-09-01 10:43:59
 * @LastEditors: Libra
 * @Description: server send message to client by socket
 */
import { sendMessageToClients } from '../socket'
import fs from 'fs'
// send exam zip file to client
const sendExamZipFile = () => {
	console.log('send exam zip file')
	const file = fs.readFileSync('exam.zip')
	// 将文件分成大小为 16KB 的片段
	const chunkSize = 1 * 1024
	const numChunks = Math.ceil(file.length / chunkSize)
	let currentChunk = 0

	// 当读取完成一个片段时，通过 WebSocket 发送该片段
	while (currentChunk < numChunks) {
		const start = currentChunk * chunkSize
		const end = Math.min(start + chunkSize, file.length)
		const chunk = file.slice(start, end)
		sendMessageToClients('EXAM_FILE', {
			chunk,
			currentChunk,
			numChunks,
		})
		currentChunk++
	}
	// send end message
	sendMessageToClients('EXAM_FILE', 'end')
}

const updateClients = () => {
	sendMessageToClients('UPDATE_CLIENTS', null)
}

export { sendExamZipFile, updateClients }
