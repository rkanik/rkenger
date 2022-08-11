import { useContext } from 'react'
import { SocketContext } from '../SocketContext'

const useSocketContext = () => {
	const context = useContext(SocketContext)
	if (!context) {
		throw new Error('SocketContext must be used within SocketProvider')
	}
	return context
}

export { useSocketContext }
