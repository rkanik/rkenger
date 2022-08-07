import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useConversationContext } from '../context'
import { useMessagesContext } from '../context/hooks'
import { Message } from '../context/types'
import { useConversation } from './useConversation'

const useCurrentConversation = () => {
	const params = useParams<{ id: string }>()

	const { sendMessage } = useMessagesContext()
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

	const onSendMessage = (message: Partial<Message>) => {
		return sendMessage(params.id, message)
	}

	return {
		currentConversation,

		onSendMessage,
	}
}

export { useCurrentConversation }
