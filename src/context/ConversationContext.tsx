import { viaCallback } from '../fetch'
import { Conversation } from './types'
import { useSuperState } from '../hooks'
import { Conversations } from '../services'
import { createContext, useCallback, useContext } from 'react'

import type { FetchResponse } from 'vuelpers'

export type ConversationState = {
	conversations: Conversation[]
	currentConversation: Conversation | null
}

export type TConversationContext = ConversationState & {
	setCurrentConversation: (conversation: Conversation) => void
	fetchConversations: (payload?: any) => Promise<[boolean, FetchResponse]>
	fetchConversationById: (
		id: string,
		payload?: any
	) => Promise<[boolean, FetchResponse]>
}

const ConversationContext = createContext<TConversationContext>(null!)
const ConversationProvider: React.FC = ({ children }) => {
	const [state, { setState }] = useSuperState<ConversationState>({
		conversations: [],
		currentConversation: null,
	})

	const fetchConversations = useCallback(
		async (payload: any) => {
			console.log('fetchConversations')
			return viaCallback(Conversations.fetch(payload), ([err, res]) => {
				if (err) return
				setState((state) => ({
					...state,
					conversations: res.conversations,
				}))
			})
		},
		[setState]
	)

	const fetchConversationById = useCallback(
		async (id: string, payload: any) => {
			return viaCallback(Conversations(id).fetch(id, payload))
		},
		[]
	)

	const setCurrentConversation = useCallback(
		(conversation: Conversation) => {
			setState((state) => ({
				...state,
				currentConversation: conversation,
			}))
		},
		[setState]
	)

	// const removeConversation = (
	// 	id: number,
	// 	conv: Conversation,
	// 	convs: Conversation[]
	// ) => {
	// 	remove({ conversations: id })
	// 	remove({ conversations: conv })
	// 	remove({ conversations: convs })

	// 	remove({
	// 		conversations: {
	// 			itemKey: 'id',
	// 			itemValue: id,
	// 		},
	// 	})
	// 	remove({
	// 		conversations: {
	// 			item: conv,
	// 		},
	// 	})
	// 	remove({
	// 		conversations: {
	// 			items: convs,
	// 			itemKey: 'type',
	// 		},
	// 	})
	// }

	// const removeConversationByIndex = (index: number, ...indexes: number[]) => {
	// 	removeByIndex({ conversations: index })
	// 	removeByIndex({ conversations: indexes })
	// }

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
