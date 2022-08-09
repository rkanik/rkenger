import { useCallback, useEffect, useMemo } from 'react'
import { Message, User } from '../context/types'
import { useMessagesContext } from '../context/hooks'
import { fetchMessages } from '../services'
import { useAuthContext } from '../context'
import { createPaginaion, Pagination } from 'vuelpers'

type MessagesGroup = {
	sender: User
	isMine: boolean
	messages: Message[]
}

const useMessages = (conversationId: string) => {
	const { currentUser } = useAuthContext()
	const { conversationMessages, setMessages, mergeMessages } =
		useMessagesContext()

	const messages = useMemo<Pagination<Message>>(() => {
		return (
			conversationMessages.find((conversation) => {
				return conversation._id === conversationId
			})?.messages || createPaginaion<Message>({ perPage: 10 })
		)
	}, [conversationId, conversationMessages])

	const isFetchedAllMessages = useMemo(() => {
		return messages.currentPage * messages.perPage >= messages.total
	}, [messages.currentPage, messages.perPage, messages.total])

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

	const onFetchMessages = useCallback(
		async (query: any = {}) => {
			const [err, res] = await fetchMessages(conversationId, {
				page: messages.currentPage,
				'per-page': messages.perPage,
				...query,
			})

			if (err) return console.log('onFetchMessages::ERR', res)
			mergeMessages({ _id: conversationId, messages: res.messages })
		},
		[conversationId, messages.currentPage, messages.perPage, mergeMessages]
	)

	const onFetchMoreMessages = useCallback(() => {
		if (isFetchedAllMessages) return

		setMessages(conversationId, (v) => ({ currentPage: v.currentPage + 1 }))
	}, [conversationId, isFetchedAllMessages, setMessages])

	// Fetch messages from server
	useEffect(() => {
		onFetchMessages()
	}, [onFetchMessages])

	return {
		messagesGroup,
		onFetchMoreMessages,
		messages: conversationMessages,
	}
}

export { useMessages }
