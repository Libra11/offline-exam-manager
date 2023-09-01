/*
 * @Author: Libra
 * @Date: 2023-09-01 10:43:59
 * @LastEditors: Libra
 * @Description: server send message to client by socket
 */
import { sendMessageToClients } from '@ele/socket'
import fs from 'fs'
// send exam zip file to client
const sendExamZipFile = () => {
	const fileData = fs.readFileSync('test.zip')
	sendMessageToClients('exam-file', fileData)
}

export { sendExamZipFile }
