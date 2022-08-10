import { useCallback, useEffect, useMemo } from 'react'

// api
import { sendMessage } from '../services'

// hooks
import { useMessages } from './useMessages'
import { useParams } from 'react-router-dom'
import { useConversation } from './useConversation'
import { useConversationsContext, useMessagesContext } from '../context/hooks'

// types
import type { Message } from '../context/types'

const useCurrentConversation = () => {
	const params = useParams<{ id: string }>()

	const { messagesGroup, onFetchMoreMessages } = useMessages(params.id)
	const { mergeMessages } = useMessagesContext()
	const { conversations, conversationPushOrUpdate, setCurrentConversation } =
		useConversationsContext()

	const currentConversation = useMemo(() => {
		return conversations.data.find((conversation) => {
			return conversation._id === params.id
		})
	}, [params.id, conversations])

	// Get the conversation from the server
	const { conversation } = useConversation(params.id)
	useEffect(() => {
		if (!conversation) return

		conversationPushOrUpdate(conversation)
	}, [conversation, conversationPushOrUpdate])

	const onSendMessage = useCallback(
		async (message: Partial<Message>) => {
			const [err, res] = await sendMessage(params.id, message)
			if (err) return console.log('onSendMessage::ERR', res)

			mergeMessages({ _id: params.id, messages: [res.newMessage] })
			setCurrentConversation({ messages: [res.newMessage] })
		},
		[params.id, mergeMessages, setCurrentConversation]
	)

	return {
		messagesGroup,
		currentConversation,
		onSendMessage,
		onFetchMoreMessages,
	}
}

export { useCurrentConversation }
