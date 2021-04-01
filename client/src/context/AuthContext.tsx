import { createContext, useEffect } from 'react'
import { createActions } from "./ActionsCreator"
import { usePersistedStateWithReducer } from './persistedState'
import { AuthReducer } from "./reducers/AuthReducer"
import { authState } from './states'
import { Action, AuthContextType, AuthState } from './types'
import { _localAuthState } from '../consts'

const AuthContext = createContext<AuthContextType>({
	...authState,
	setState() { },
	resetState() { },
})

const AuthProvider: React.FC = ({ children }) => {

	const [state, dispatch] = usePersistedStateWithReducer({
		key: _localAuthState, value: authState, reducer: AuthReducer
	}) as [AuthState, React.Dispatch<Action>]

	let {
		setState,
		resetState
	} = createActions(dispatch)

	useEffect(() => {
		console.log('AuthState', state)
	}, [state])

	return (
		<AuthContext.Provider value={{
			...state,
			setState,
			resetState
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext }