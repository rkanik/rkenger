import { MessagesState, MessagesContext, TMessagesContext } from '../index'
import { useCallback } from 'react'
import { useSuperState } from '../../hooks'
import { Message } from '../types'
import { deepMerge } from 'deep-array'
import { createPaginaion } from 'vuelpers'

import type { Pagination } from 'vuelpers'
import { isArray, isFunction } from 'lodash'

const MessageProvider: React.FC = ({ children }) => {
	const [state, { setPartialState }] = useSuperState<MessagesState>({
		messages: new Map(),
		conversationMessages: [],
	})

	const _setMessages = useCallback<TMessagesContext['_setMessages']>(
		(_id, payload) => {
			return setPartialState((state) => {
				const prevMessages =
					state.messages.get(_id) || createPaginaion<Message>()

				const { data = [], ...nextMessages } = isFunction(payload)
					? payload(prevMessages)
					: payload

				const mergedData = deepMerge(
					prevMessages.data,
					data,
					'_id',
					'unshift'
				)

				return {
					messages: new Map(state.messages).set(_id, {
						...prevMessages,
						...nextMessages,
						data: mergedData.sort((a, b) => {
							return b.createdAt > a.createdAt ? 1 : -1
						}),
					}),
				}
			})
		},
		[setPartialState]
	)

	const setConversationMessage = useCallback<
		TMessagesContext['setConversationMessage']
	>(
		(_id, payload) => {
			return setPartialState((state) => ({
				conversationMessages: state.conversationMessages.map((v) => {
					if (v._id !== _id) return v
					return {
						...v,
						...(typeof payload === 'function' ? payload(v) : payload),
					}
				}),
			}))
		},
		[setPartialState]
	)

	const setMessages = useCallback<TMessagesContext['setMessages']>(
		(_id, payload) => {
			return setConversationMessage(_id, (v) => ({
				messages: {
					...v.messages,
					...(typeof payload === 'function'
						? payload(v.messages)
						: payload),
				},
			}))
		},
		[setConversationMessage]
	)

	const mergeMessages = useCallback(
		(payload: { _id: string; messages: Message[] | Pagination<Message> }) => {
			const isExist = state.conversationMessages.some((v) => {
				return v._id === payload._id
			})

			const messagesData = isArray(payload.messages)
				? payload.messages
				: payload.messages.data

			if (!isExist) {
				return setConversationMessage(payload._id, {
					messages: createPaginaion({
						data: messagesData,
					}),
				})
			}

			setMessages(payload._id, (messages) => {
				return {
					...(!isArray(payload.messages) ? payload.messages : {}),
					data: deepMerge(messages.data, messagesData, '_id', 'push'),
				}
			})

			// setState((state) => {
			// 	const isExist = state.conversationMessages.some((v) => {
			// 		return v._id === payload._id
			// 	})

			// 	const getMessages = (
			// 		messages: Message[] | Pagination<Message>,
			// 		conversation?: ConversationMessage
			// 	) => {
			// 		return Array.isArray(messages)
			// 			? createPaginaion<Message>({
			// 					perPage: conversation?.messages.perPage || 25,
			// 					currentPage: conversation?.messages.currentPage || 1,
			// 					data: messages,
			// 			  })
			// 			: messages
			// 	}

			// 	return {
			// 		...state,
			// 		conversationMessages: isExist
			// 			? state.conversationMessages.map((conversation) => {
			// 					if (conversation._id !== payload._id) {
			// 						return conversation
			// 					}

			// 					const messages = getMessages(
			// 						payload.messages,
			// 						conversation
			// 					)

			// 					return {
			// 						...payload,
			// 						messages: {
			// 							...conversation.messages,
			// 							...messages,
			// 							data: deepMerge(
			// 								conversation.messages.data,
			// 								messages.data,
			// 								'_id',
			// 								'push'
			// 							),
			// 							// messages.data.reduce((data, message) => {
			// 							// 	const index = data.findIndex((v) => {
			// 							// 		return v._id === message._id
			// 							// 	})
			// 							// 	if (index === -1) data = [message, ...data]
			// 							// 	else {
			// 							// 		data[index] = {
			// 							// 			...data[index],
			// 							// 			...message,
			// 							// 		}
			// 							// 	}
			// 							// 	return data
			// 							// }, conversation.messages.data),
			// 						},
			// 					}
			// 			  })
			// 			: [
			// 					{
			// 						...payload,
			// 						messages: getMessages(payload.messages),
			// 					} as ConversationMessage,
			// 					...state.conversationMessages,
			// 			  ],
			// 	}
			// })
		},
		[state.conversationMessages, setMessages, setConversationMessage]
	)

	return (
		<MessagesContext.Provider
			value={{
				...state,
				setMessages,
				_setMessages,
				mergeMessages,
				setConversationMessage,
			}}
		>
			{children}
		</MessagesContext.Provider>
	)
}

export { MessageProvider }
