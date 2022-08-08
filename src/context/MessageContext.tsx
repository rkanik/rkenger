import { FetchResponse } from 'vuelpers'
import { createContext } from 'react'

import type { Message } from './types'
import type { Pagination, ConversationMessage } from '../types'

export type MessageState = {
	conversationMessages: ConversationMessage[]
	messages: {
		[id: string]: Pagination<Message>
	}
}

export type TMessageContext = MessageState & {
	mergeMessages: (payload: {
		_id: string
		messages: Message[] | Pagination<Message>
	}) => void
	fetchMessages: (
		conversationId: string,
		payload?: any
	) => Promise<[boolean, FetchResponse]>
	sendMessage: (
		id: string,
		message: Partial<Message>
	) => Promise<[boolean, FetchResponse]>
}

const MessageContext = createContext<TMessageContext>(null!)

export { MessageContext }
