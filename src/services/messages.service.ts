import { fetch } from '../fetch'

const fetchMessages = (conversationId: string, query?: any) => {
	return fetch.get(`/conversations/${conversationId}/messages`, query)
}
const sendMessage = (conversationId: string, message: any) => {
	return fetch.post(`/conversations/${conversationId}/messages`, message)
}

export { fetchMessages, sendMessage }
