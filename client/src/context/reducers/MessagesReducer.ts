import { messagesState } from "../states"
import { Action, Message, MessagesState, ActionTypes, MessagesStateArrays } from '../types'

export const MessagesReducer = (state: MessagesState, action: Action) => {
	const { type, payload } = action

	if (type === ActionTypes._setState) {
		return Object
			.keys(payload)
			.reduce((state: MessagesState, key: string) => {
				return {
					...state,
					[key]: payload[key]
				}
			}, state)
	}
	else if (type === ActionTypes._pushTo) {
		let [property, ...els] = payload as [MessagesStateArrays, Message]
		if (!property || !els.length) throw new Error('Invalid Paylod!')
		return {
			...state,
			[property]: [
				...state[property],
				...els
			]
		}
	}
	else if (type === ActionTypes._updateTo) {
		let [property, data] = payload as [MessagesStateArrays, Message]
		if (!property || !data) throw new Error('Invalid Paylod!')
		state[property].forEach((el: any) => {
			if (el.id === data.id) {
				el = { ...el, ...data }
			}
		})
		return state
	}
	else if (type === ActionTypes._deleteFrom) {
		let [property, data] = payload as [MessagesStateArrays, string]
		if (!property || !data) throw new Error('Invalid Paylod!')
		return {
			...state,
			[property]: state[property]
				// @ts-ignore
				.filter((el: { id: string }) => el.id !== data)
		}
	}
	else if (type === ActionTypes._resetState) {
		return { ...messagesState }
	}

	return state

}
