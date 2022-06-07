import { useEffect, useState as useReactState } from 'react'
import { jsonParse } from 'vuelpers'

const useState = <S>(
	initialState: S | (() => S)
): [S, (partialState: Partial<S>) => void] => {
	const [state, setFullState] = useReactState(initialState)
	const setState = (partialState: Partial<S>) => {
		setFullState((prevState) => ({ ...prevState, ...partialState }))
	}
	return [state, setState]
}

const createPersistedState = (key: string) => {
	return <S>(
		initialState: S | (() => S)
	): [S, (partialState: Partial<S>) => void] => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, localState = {}] = jsonParse(localStorage.getItem(key) || '')
		const [state, setState] = useState({
			...initialState,
			...localState,
		})

		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(state))
		}, [state])

		return [state, setState]
	}
}

export { useState, useReactState, createPersistedState }
