import { authState } from "./states"
import { Dispatch } from "react"
import { Action, ActionTypes } from "./types"

const createActions = (dispatch: Dispatch<Action>) => {

	const setState = (payload: any) =>
		dispatch({ type: ActionTypes._setState, payload })

	const pushTo = (payload: [string, ...any]) => {
		console.log('ACTION::pushTo', payload)
		dispatch({ type: ActionTypes._pushTo, payload })
	}

	const updateTo = (payload: [string, ...any]) =>
		dispatch({ type: ActionTypes._updateTo, payload })

	const deleteFrom = (payload: [string, string]) =>
		dispatch({ type: ActionTypes._deleteFrom, payload })

	const resetState = () =>
		dispatch({ type: ActionTypes._resetState, payload: authState })

	return { setState, resetState, pushTo, updateTo, deleteFrom }
}

export { createActions }