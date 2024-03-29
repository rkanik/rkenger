import { viaCallback } from '../fetch'
import { Conversation } from './types'
import { useSuperState } from '../hooks'
import { Conversations } from '../services'
import { createContext, useCallback } from 'react'

import { createPaginaion, FetchResponse, Pagination } from 'vuelpers'
import { deepMerge } from 'deep-array'
import { isArray, isFunction } from 'lodash'
import { PartialPayload, SetPaginated } from '../types'

export type ConversationState = {
	conversations: Pagination<Conversation>
	currentConversation: Conversation | null
}

export type TConversationContext = ConversationState & {
	setCurrentConversation: (conversation: Partial<Conversation>) => void
	fetchConversations: (payload?: any) => Promise<[boolean, FetchResponse]>
	fetchConversationById: (
		id: string,
		payload?: any
	) => Promise<[boolean, FetchResponse]>

	setConversations: (payload: SetPaginated<Conversation>) => void
	conversationPushOrUpdate: (payload: Conversation | Conversation[]) => void
	conversationUpdate: (
		_id: string,
		payload: PartialPayload<Conversation>
	) => void
}

const ConversationContext = createContext<TConversationContext>(null!)
const ConversationProvider: React.FC = ({ children }) => {
	const [state, { setState, setPartialState }] =
		useSuperState<ConversationState>({
			conversations: createPaginaion(),
			currentConversation: null,
		})

	const setConversations = useCallback<
		TConversationContext['setConversations']
	>(
		(payload) => {
			setPartialState((state) => {
				return {
					conversations: {
						...state.conversations,
						...(typeof payload === 'function'
							? payload(state.conversations)
							: payload),
					},
				}
			})
		},
		[setPartialState]
	)

	const fetchConversations = useCallback(
		async (payload: any) => {
			return viaCallback(Conversations.fetch(payload), ([err, res]) => {
				if (err) return
				setConversations((v: any) => {
					if (res.conversations.currentPage > 1) {
						res.conversations.data = deepMerge(
							v.data,
							res.conversations.data,
							'_id',
							'push'
						)
					}
					return {
						...v,
						...res.conversations,
					}
				})
			})
		},
		[setConversations]
	)

	const fetchConversationById = useCallback(
		async (id: string, payload: any) => {
			return viaCallback(Conversations(id).fetch(id, payload))
		},
		[]
	)

	const setCurrentConversation = useCallback(
		(conversation: Partial<Conversation> = {}) => {
			setState((state) => ({
				...state,
				currentConversation: {
					...(state.currentConversation || {}),
					...conversation,
				} as Conversation,
			}))
		},
		[setState]
	)

	const conversationPushOrUpdate = useCallback(
		(payload: Conversation | Conversation[]) => {
			return setConversations((conversations) => {
				return {
					data: deepMerge(
						conversations.data,
						isArray(payload) ? payload : [payload],
						'_id',
						'push'
					),
				}
			})
		},
		[setConversations]
	)

	const conversationUpdate = useCallback<
		TConversationContext['conversationUpdate']
	>(
		(_id, payload) => {
			return setConversations((conversations) => {
				return {
					data: conversations.data.map((v) => {
						if (v._id !== _id) return v
						const partial = isFunction(payload) ? payload(v) : payload
						return { ...v, ...partial }
					}),
				}
			})
		},
		[setConversations]
	)

	return (
		<ConversationContext.Provider
			value={{
				...state,
				conversationUpdate,
				setConversations,
				fetchConversations,
				fetchConversationById,
				setCurrentConversation,
				conversationPushOrUpdate,
			}}
		>
			{children}
		</ConversationContext.Provider>
	)
}

export { ConversationContext, ConversationProvider }
