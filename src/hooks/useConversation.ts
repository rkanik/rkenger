import { Conversation } from './../context/types'
import { useEffect, useState } from 'react'
import { useConversationsContext } from '../context/hooks'

const useConversation = (id: string) => {
	const [conversation, setConversation] = useState<Conversation>()
	const { fetchConversationById } = useConversationsContext()

	useEffect(() => {
		fetchConversationById(id).then(([err, res]) => {
			if (!err) setConversation(res.conversation)
		})
	}, [id, fetchConversationById])
	return { conversation }
}

export { useConversation }
