import { AuthState, GlobalState, MessagesState } from './types'

export const globalState: GlobalState = {
	theme: {
		isDark: false,
	},
}

export const authState: AuthState = {
	currentUser: undefined,
}

export const messagesState: MessagesState = {
	messages: [],
	conversations: [],
	convDetailsExpanded: false,
	conversation: null,
}
