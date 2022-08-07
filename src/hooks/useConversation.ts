import { Conversation } from './../context/types'
import { useEffect, useState } from 'react'
import { useConversationContext } from '../context'

const useConversation = (id: string) => {
	const [conversation, setConversation] = useState<Conversation>(null!)
	const { fetchConversationById } = useConversationContext()

	useEffect(() => {
		fetchConversationById(id).then(([err, res]) => {
			if (err) return
			setConversation(res.conversation)
		})
	}, [id, fetchConversationById])

	return { conversation }
}

export { useConversation }
