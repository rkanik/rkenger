import { createContext } from 'react'

import type { Message } from './types'
import type { Pagination } from 'vuelpers'
import type { ConversationMessage } from '../types'

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

	setConversationMessage: (
		_id: string,
		payload:
			| Partial<ConversationMessage>
			| ((v: ConversationMessage) => Partial<ConversationMessage>)
	) => void

	setMessages: (
		_id: string,
		payload:
			| Partial<Pagination<Message>>
			| ((v: Pagination<Message>) => Partial<Pagination<Message>>)
	) => void
}

const MessageContext = createContext<TMessageContext>(null!)

export { MessageContext }
