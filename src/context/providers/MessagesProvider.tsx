import { MessageState, MessageContext } from '../'
import { useCallback } from 'react'
import { viaCallback } from '../../fetch'
import { useSuperState } from '../../hooks'
import { Conversations } from '../../services'
import { Pagination } from '../../types'
import { Message } from '../types'

const MessageProvider: React.FC = ({ children }) => {
	const [state, { setState }] = useSuperState<MessageState>({
		messages: {},
	})

	const setMessages = useCallback(
		(id: string, messages: Pagination<Message>) => {
			setState((state) => {
				return {
					...state,
					messages: {
						...state.messages,
						[id]: messages,
					},
				}
			})
		},
		[setState]
	)

	const fetchMessages = useCallback(
		async (id: string, payload: any) => {
			console.log('fetchConversations')
			return viaCallback(
				Conversations(id).messages.fetch(payload),
				([err, res]) => {
					if (err) return
					setMessages(id, res.messages)
				}
			)
		},
		[setMessages]
	)

	const sendMessage = useCallback(
		(id: string, message: Partial<Message>) => {
			return viaCallback(
				Conversations(id).messages.send(message),
				([err, res]) => {
					if (err) return
					const messages = state.messages[id]
					messages.data.push(res.newMessage)
					setMessages(id, messages)
				}
			)
		},
		[state.messages, setMessages]
	)

	return (
		<MessageContext.Provider value={{ ...state, fetchMessages, sendMessage }}>
			{children}
		</MessageContext.Provider>
	)
}

export { MessageProvider }
