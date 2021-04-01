import { authState } from "../states"
import { Action, AuthState } from '../types'
import { _resetState, _setState } from "../../consts"

export const AuthReducer = (state: AuthState, action: Action) => {
	const { type, payload } = action
	switch (type) {
		case _setState:
			return Object
				.keys(payload)
				.reduce((state: AuthState, key: string) => {
					return {
						...state,
						[key]: payload[key]
					}
				}, state)
		case _resetState:
			return { ...authState }
		default:
			throw new Error('Action Not Found!')
	}
}
