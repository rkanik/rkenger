import { initialList } from './../helpers'
import { useEffect, useMemo } from 'react'
import { useMessagesContext } from '../context/hooks'
import { Message, User } from '../context/types'

type MessagesGroup = {
	sender: User
	messages: Message[]
}

const useMessages = (conversationId: string) => {
	const { messages, fetchMessages } = useMessagesContext()

	const conversationMessages = useMemo(() => {
		return messages[conversationId] || initialList<Message>()
	}, [conversationId, messages])

	const messagesGroup = useMemo<MessagesGroup[]>(() => {
		return conversationMessages.data.reduce(
			(senderGroup, message, index, messages) => {
				if (index === 0) {
					return [{ sender: message.sender, messages: [message] }]
				}
				const prevMessage = messages[index - 1]
				if (prevMessage.sender._id !== message.sender._id) {
					return [
						...senderGroup,
						{ sender: message.sender, messages: [message] },
					]
				}
				senderGroup[senderGroup.length - 1].messages.push(message)
				return senderGroup
			},
			[] as any
		)
	}, [conversationMessages])

	useEffect(() => {
		fetchMessages(conversationId)
	}, [conversationId, fetchMessages])

	return {
		messagesGroup,
		messages: conversationMessages,
	}
}

export { useMessages }
