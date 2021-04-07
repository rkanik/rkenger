import { createContext, useEffect } from 'react'
import { createActions } from "./ActionsCreator"
import { MessagesReducer } from './reducers/MessagesReducer'
import { messagesState } from './states'
import { Action, MessagesContextType, MessagesState } from './types'
import { History } from 'history';
import { usePersistedStateWithReducer } from './persistedState'
import Messages from '../pages/Messages'
import { _localMsgState } from '../consts'

const MessagesContext = createContext<MessagesContextType>({
	...messagesState,
	setState: () => null,
	pushTo: () => null,
	updateTo: () => null,
	deleteFrom: () => null,
	resetState: () => null,
})

type Props = { history: History }
const MessagesProvider: React.FC<Props> = ({ history }) => {

	const [state, dispatch] = usePersistedStateWithReducer({
		key: _localMsgState, value: messagesState, reducer: MessagesReducer
	}) as [MessagesState, React.Dispatch<Action>]

	let {
		setState, resetState,
		pushTo, updateTo, deleteFrom,
	} = createActions(dispatch)

	useEffect(() => {
		console.log('MessagesState', state)
	}, [state])

	return (
		<MessagesContext.Provider value={{
			...state,
			setState, resetState,
			pushTo, updateTo, deleteFrom,
		}}>
			<Messages history={history} />
		</MessagesContext.Provider>
	)
}

export { MessagesProvider, MessagesContext }