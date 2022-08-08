import { Message } from '../context/types'
import { fetch } from '../fetch'

const ConversationApi = {
	fetch: (query: any) => fetch.get('/conversations', query),
}

const Conversations = (id: string) => {
	const conversationId = id

	const messages = (id: string) => {
		return {}
	}

	messages.fetch = (query: any) => {
		return fetch.get(`/conversations/${conversationId}/messages`, query)
	}

	messages.send = (message: Partial<Message>) => {
		return fetch.post(`/conversations/${conversationId}/messages`, message)
	}

	return {
		messages,
		fetch: (id: string, query: any) => {
			return fetch.get(`/conversations/${id}`, query)
		},
		fetchMessages(conversationId: string, query: any) {
			return fetch.get(`/conversations/${conversationId}/messages`, query)
		},
	}
}

Conversations.fetch = (query: any) => fetch.get('/conversations', query)

export { ConversationApi, Conversations }
