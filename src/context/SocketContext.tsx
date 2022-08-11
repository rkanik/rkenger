import { deepMerge } from 'deep-array'
import { createContext, useCallback, useEffect } from 'react'
import { io } from 'socket.io-client'
import { useSuperState } from '../hooks'
import { useAuthContext } from './AuthContext'
import { User } from './types'

type SocketContextState = {
	socket: ReturnType<typeof io>
	onlineUsers: User[]
}

type SocketContextType = SocketContextState & {
	isOnline: (user: Pick<User, '_id'>) => boolean
	setUsers: (users: User | User[]) => void
	removeUsers: (users: User | User[]) => void
}

const SocketContext = createContext<SocketContextType>(null!)

const SocketProvider: React.FC = ({ children }: any) => {
	const { accessToken, currentUser } = useAuthContext()

	const [state, { setPartialState }] = useSuperState<SocketContextState>({
		onlineUsers: [],
		socket: io('http://localhost:3500', {
			autoConnect: false,
			auth: {
				token: accessToken,
				user: currentUser,
			},
		}),
	})

	const setUsers = useCallback(
		(users: User | User[]) => {
			return setPartialState(({ onlineUsers }) => {
				users = Array.isArray(users) ? users : [users]
				return {
					onlineUsers: deepMerge(onlineUsers, users, '_id'),
				}
			})
		},
		[setPartialState]
	)

	const removeUsers = useCallback(
		(users: User | User[]) => {
			return setPartialState(({ onlineUsers }) => {
				users = Array.isArray(users) ? users : [users]
				const _ids: string[] = users.map((user) => {
					return user._id
				})
				return {
					onlineUsers: onlineUsers.filter((u) => {
						return !_ids.includes(u._id)
					}),
				}
			})
		},
		[setPartialState]
	)

	const isOnline = useCallback(
		(user: Pick<User, '_id'>) => {
			return state.onlineUsers.some((u) => {
				return u._id === user._id
			})
		},
		[state.onlineUsers]
	)

	useEffect(() => {
		console.log('useEffect:socket')

		state.socket.on('online', setUsers)
		state.socket.on('offline', removeUsers)

		// client-side
		state.socket.on('connect_error', (err: any) => {
			console.log('connect_error', err.message)
		})
	}, [state.socket, setUsers, removeUsers])

	useEffect(
		() => {
			state.socket.connect()
			return () => {
				state.socket.disconnect()
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return (
		<SocketContext.Provider
			value={{ ...state, isOnline, setUsers, removeUsers }}
		>
			{children}
		</SocketContext.Provider>
	)
}

export { SocketContext, SocketProvider }
