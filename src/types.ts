import { Pagination } from 'vuelpers'
import { Message } from './context/types'

export type ConversationMessage = {
	_id: string
	messages: Pagination<Message>
}

// export type Pagination<T> = {
// 	page: number
// 	total: number
// 	perPage: number
// 	data: T[]
// }

export interface MsgGroup {
	messages: Message[]
	sentAt: string
	sendBy: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {}
