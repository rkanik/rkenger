import { useContext } from 'react'
import { ConversationContext } from '../ConversationContext'

const useConversationsContext = () => {
	const context = useContext(ConversationContext)
	if (!context) {
		throw new Error(
			'ConversationsContext must be used within ConversationsProvider'
		)
	}
	return context
}

export { useConversationsContext }
