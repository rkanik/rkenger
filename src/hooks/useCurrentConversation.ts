import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useConversationContext } from '../context'
import { useMessagesContext } from '../context/hooks'
import { Conversation, Message } from '../context/types'
import { sendMessage } from '../services'
import { useConversation } from './useConversation'
import { useMessages } from './useMessages'

const useCurrentConversation = () => {
	const params = useParams<{ id: string }>()

	const { messagesGroup } = useMessages(params.id)
	const { mergeMessages } = useMessagesContext()
	const { conversations, currentConversation, setCurrentConversation } =
		useConversationContext()

	// Get the conversation from the conversations array
	useEffect(() => {
		const localConversation = conversations.find((v) => v._id === params.id)
		if (localConversation) setCurrentConversation(localConversation)
	}, [params.id, conversations, setCurrentConversation])

	// Get the conversation from the server
	const { conversation } = useConversation(params.id)
	useEffect(() => {
		setCurrentConversation(conversation)
	}, [conversation, setCurrentConversation])

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
	}
}

export { useCurrentConversation }
