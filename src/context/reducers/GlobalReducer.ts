import { globalState } from "../states"
import { Action, GlobalState } from '../types'
import { _resetState, _setState } from "../../consts"

export const GlobalReducer = (state: GlobalState, action: Action) => {
	const { type, payload } = action
	switch (type) {
		case _setState:
			return Object
				.keys(payload)
				.reduce((state: GlobalState, key: string) => {
					return {
						...state,
						[key]: payload[key]
					}
				}, state)
		case _resetState:
			return { ...globalState }
		default:
			throw new Error('Action Not Found!')
	}
}
