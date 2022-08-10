import { useContext } from 'react'
import { MessagesContext } from '../MessagesContext'

const useMessagesContext = () => {
	const context = useContext(MessagesContext)
	if (!context) {
		throw new Error('MessagesContext must be used within MessagesProvider')
	}
	return context
}

export { useMessagesContext }
