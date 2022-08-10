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

	const { _setMessages } = useMessagesContext()
	const { messagesGroup, onFetchMoreMessages } = useMessages(params.id)
	const { conversations, conversationPushOrUpdate, conversationUpdate } =
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

			_setMessages(params.id, { data: [res.newMessage] })
			conversationUpdate(params.id, { messages: [res.newMessage] })
		},
		[params.id, _setMessages, conversationUpdate]
	)

	return {
		messagesGroup,
		currentConversation,
		onSendMessage,
		onFetchMoreMessages,
	}
}

export { useCurrentConversation }
