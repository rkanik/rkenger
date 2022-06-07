import { AuthApi } from '../services'
import { viaCallback } from '../fetch'
import { AuthContextType, AuthState } from './types'
import { createContext, useContext } from 'react'
import { createPersistedState } from '../hooks'

const useAuthState = createPersistedState('auth')
const AuthContext = createContext<AuthContextType | null>(null)

const initialState = (): AuthState => ({
	expiresAt: undefined,
	currentUser: undefined,
	accessToken: undefined,
	refreshToken: undefined,
})

const AuthProvider: React.FC = ({ children }) => {
	const [state, setState] = useAuthState<AuthState>(initialState())

	const login = (user: any) => {
		return viaCallback(AuthApi.login(user), ([err, res]) => {
			if (err) return
			setState({
				currentUser: res.user,
				accessToken: res.accessToken,
				refreshToken: res.refreshToken,
				expiresAt: new Date(Date.now() + res.expiresIn),
			})
		})
	}

	const resetState = () => {
		setState(initialState())
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				setState,
				resetState,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => {
	const context = useContext(AuthContext) as AuthContextType
	if (!context) {
		throw new Error('AuthContext must be used within AuthProvider')
	}
	return context
}

export { AuthProvider, AuthContext, useAuthContext }
