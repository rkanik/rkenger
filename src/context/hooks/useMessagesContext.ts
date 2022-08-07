import { useContext } from 'react'
import { MessageContext } from '../'

const useMessagesContext = () => {
	const context = useContext(MessageContext)
	if (!context) {
		throw new Error('MessagesContext must be used within MessagesProvider')
	}
	return context
}

export { useMessagesContext }
