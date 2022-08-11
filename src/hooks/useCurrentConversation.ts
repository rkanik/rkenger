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
import { useSocketContext } from '../context/hooks/useSocketContext'

const useCurrentConversation = () => {
	const params = useParams<{ id: string }>()

	// Get the conversation from the server
	const { conversation } = useConversation(params.id)

	const { socket } = useSocketContext()
	const { _setMessages } = useMessagesContext()
	const { messagesGroup, onFetchMoreMessages } = useMessages(params.id)
	const { conversations, conversationPushOrUpdate, conversationUpdate } =
		useConversationsContext()

	// Currently selected conversation
	const currentConversation = useMemo(
		() => {
			return conversations.data.find((conversation) => {
				return conversation._id === params.id
			})
		},
		//
		[params.id, conversations]
	)

	// Merge messages
	const onMessage = useCallback(
		(message: Message) => {
			console.log('onMessage', message)

			_setMessages(params.id, { data: [message] })
			conversationUpdate(params.id, { messages: [message] })
		},
		[params.id, _setMessages, conversationUpdate]
	)

	// Send message
	const onSendMessage = useCallback(
		async (message: Partial<Message>) => {
			const [err, res] = await sendMessage(params.id, message)
			if (err) return console.log('onSendMessage::ERR', res)

			onMessage(res.newMessage)
		},
		[params.id, onMessage]
	)

	// Update the conversation in the context
	useEffect(
		() => {
			if (!conversation) return
			conversationPushOrUpdate(conversation)
		},
		//
		[conversation, conversationPushOrUpdate]
	)

	// Listen for new messages
	useEffect(
		() => {
			const event = `message.${params.id}`
			socket.on(event, onMessage)
			return () => {
				socket.off(event, onMessage)
			}
		},
		//
		[params.id, socket, onMessage]
	)

	return {
		messagesGroup,
		currentConversation,
		onSendMessage,
		onFetchMoreMessages,
	}
}

export { useCurrentConversation }
