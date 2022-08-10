import { createContext } from 'react'

import type { Message } from './types'
import type { Pagination } from 'vuelpers'
import type { ConversationMessage, SetPaginated } from '../types'

export type MessagesState = {
	conversationMessages: ConversationMessage[]
	messages: Map<string, Pagination<Message>>
}

export type TMessagesContext = MessagesState & {
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

	_setMessages: (_id: string, payload: SetPaginated<Message>) => void
}

const MessagesContext = createContext<TMessagesContext>(null!)

export { MessagesContext }
