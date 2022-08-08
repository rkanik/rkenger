import { MessageState, MessageContext } from '../'
import { useCallback } from 'react'
import { viaCallback } from '../../fetch'
import { useSuperState } from '../../hooks'
import { Conversations } from '../../services'
import { ConversationMessage, Pagination } from '../../types'
import { Message } from '../types'
import { initialList } from '../../helpers'

const MessageProvider: React.FC = ({ children }) => {
	const [state, { setState }] = useSuperState<MessageState>({
		messages: {},
		conversationMessages: [],
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
					const messages = {
						...state.messages[id],
						data: [...state.messages[id].data, res.newMessage],
					}

					setMessages(id, messages)
				}
			)
		},
		[state.messages, setMessages]
	)

	const mergeMessages = useCallback(
		(payload: { _id: string; messages: Message[] | Pagination<Message> }) => {
			setState((state) => {
				const isExist = state.conversationMessages.some((v) => {
					return v._id === payload._id
				})

				const getMessages = (
					messages: Message[] | Pagination<Message>,
					conversation?: ConversationMessage
				) => {
					return Array.isArray(messages)
						? initialList<Message>({
								page: conversation?.messages.page || 1,
								perPage: conversation?.messages.perPage || 10,
								data: messages,
						  })
						: messages
				}

				return {
					...state,
					conversationMessages: isExist
						? state.conversationMessages.map((conversation) => {
								if (conversation._id !== payload._id) {
									return conversation
								}

								const messages = getMessages(
									payload.messages,
									conversation
								)

								return {
									...payload,
									messages: {
										...conversation.messages,
										...messages,
										data: messages.data.reduce((data, message) => {
											const index = data.findIndex((v) => {
												return v._id === message._id
											})
											if (index === -1) data = [message, ...data]
											else {
												data[index] = {
													...data[index],
													...message,
												}
											}
											return data
										}, conversation.messages.data),
									},
								}
						  })
						: [
								{
									...payload,
									messages: getMessages(payload.messages),
								} as ConversationMessage,
								...state.conversationMessages,
						  ],
				}
			})
		},
		[setState]
	)

	return (
		<MessageContext.Provider
			value={{ ...state, fetchMessages, sendMessage, mergeMessages }}
		>
			{children}
		</MessageContext.Provider>
	)
}

export { MessageProvider }
