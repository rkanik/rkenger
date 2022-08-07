import { Conversation } from './../context/types'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useConversationContext } from '../context'

const useConversations = () => {
	const history = useHistory()

	const { fetchConversations, ...context } = useConversationContext()

	const onClickConversationItem = (conversation: Conversation) => {
		history.push(`/messages/${conversation._id}`)
	}

	useEffect(() => {
		fetchConversations()
	}, [fetchConversations])

	return { ...context, fetchConversations, onClickConversationItem }
}

export { useConversations }
