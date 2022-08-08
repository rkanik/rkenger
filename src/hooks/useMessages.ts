import { useCallback, useEffect, useMemo } from 'react'
import { initialList } from './../helpers'
import { Message, User } from '../context/types'
import { useMessagesContext } from '../context/hooks'
import { fetchMessages } from '../services'
import { useAuthContext } from '../context'

type MessagesGroup = {
	sender: User
	isMine: boolean
	messages: Message[]
}

const useMessages = (conversationId: string) => {
	const { currentUser } = useAuthContext()
	const { conversationMessages, mergeMessages } = useMessagesContext()

	const messages = useMemo(() => {
		return (
			conversationMessages.find((conversation) => {
				return conversation._id === conversationId
			})?.messages || initialList<Message>()
		)
	}, [conversationId, conversationMessages])

	// // Locally fethed messages
	// const conversationMessages = useMemo(() => {
	// 	return messages[conversationId] || initialList<Message>()
	// }, [conversationId, messages])

	// Group messages by sender
	const messagesGroup = useMemo<MessagesGroup[]>(() => {
		return messages.data.reduce((senderGroup, message, index, messages) => {
			const group: MessagesGroup = {
				messages: [message],
				sender: message.sender,
				isMine: currentUser?._id === message.sender._id,
			}

			if (index === 0) return [group]

			const prevMessage = messages[index - 1]
			if (prevMessage.sender._id !== message.sender._id) {
				return [...senderGroup, group]
			}

			senderGroup[senderGroup.length - 1].messages.push(message)
			return senderGroup
		}, [] as any)
	}, [messages, currentUser])

	// console.log({ messages })

	const onFetchMessages = useCallback(
		async (query: any = {}) => {
			const [err, res] = await fetchMessages(conversationId, {
				page: messages.page,
				'per-page': messages.perPage,
				...query,
			})

			if (err) return console.log('onFetchMessages::ERR', res)
			mergeMessages({ _id: conversationId, messages: res.messages })
		},
		[conversationId, messages.page, messages.perPage, mergeMessages]
	)

	// Fetch messages from server
	useEffect(() => {
		onFetchMessages()
	}, [onFetchMessages])

	return {
		messagesGroup,
		messages: conversationMessages,
	}
}

export { useMessages }
