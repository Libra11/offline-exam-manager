/// <reference types="vite/client" />

declare module 'myTypes' {
	export interface IP {
		serverIp: string
		localIp: string
	}

	export interface IMessage<T> {
		type: string
		data: T
	}
}
