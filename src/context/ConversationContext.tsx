import { viaCallback } from '../fetch'
import { Conversation } from './types'
import { useSuperState } from '../hooks'
import { Conversations } from '../services'
import { createContext, useCallback, useContext } from 'react'

import { createPaginaion, FetchResponse, Pagination } from 'vuelpers'
import { deepMerge } from 'deep-array'

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
}

const ConversationContext = createContext<TConversationContext>(null!)
const ConversationProvider: React.FC = ({ children }) => {
	const [state, { setState }] = useSuperState<ConversationState>({
		conversations: createPaginaion(),
		currentConversation: null,
	})

	const setConversations = useCallback(
		(payload: any) => {
			setState((state) => {
				return {
					...state,
					conversations: {
						...state.conversations,
						...(typeof payload === 'function'
							? payload(state.conversations)
							: payload),
					},
				}
			})
		},
		[setState]
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

	return (
		<ConversationContext.Provider
			value={{
				...state,
				fetchConversations,
				fetchConversationById,
				setCurrentConversation,
			}}
		>
			{children}
		</ConversationContext.Provider>
	)
}

const useConversationContext = () => {
	const context = useContext(ConversationContext)
	if (!context) {
		throw new Error(
			'ConversationContext must be used within ConversationProvider'
		)
	}
	return context
}

export { ConversationContext, ConversationProvider, useConversationContext }
