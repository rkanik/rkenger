import { createContext, useEffect } from 'react'
import { createActions } from "./ActionsCreator"
import { usePersistedStateWithReducer } from './persistedState'
import { AuthReducer } from "./reducers/AuthReducer"
import { globalState } from './states'
import { Action, GlobalContextType, GlobalState } from './types'
import { _localState } from '../consts'

const GlobalContext = createContext<GlobalContextType>({
	...globalState,
	setState() { },
	resetState() { },
})

const GlobalProvider: React.FC = ({ children }) => {

	const [state, dispatch] = usePersistedStateWithReducer({
		key: _localState, value: globalState, reducer: AuthReducer
	}) as [GlobalState, React.Dispatch<Action>]

	let {
		setState,
		resetState
	} = createActions(dispatch)

	useEffect(() => {
		const htmlClass = document.documentElement.classList
		htmlClass.toggle('dark', state.theme.isDark)
	}, [state.theme.isDark])

	useEffect(() => {
		console.log('State', state)
	}, [state])

	return (
		<GlobalContext.Provider value={{
			...state,
			setState,
			resetState
		}}>
			{children}
		</GlobalContext.Provider>
	)
}

export { GlobalProvider, GlobalContext }