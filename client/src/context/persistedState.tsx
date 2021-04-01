import { useState, useEffect, useReducer } from "react";

const getValue = (key: string, value: any) => {
	let localValue = localStorage.getItem(key)
	return localValue ? JSON.parse(localValue) : value
}

interface Params {
	key: string
	value: any
	reducer: any
	maxArrLength?: number
}
const usePersistedStateWithReducer = ({ key, value, reducer, maxArrLength = 10 }: Params) => {
	const [state, dispatch] = useReducer(reducer, getValue(key, value))
	useEffect(() => {
		// @ts-ignore
		// eslint-disable-next-line array-callback-return
		let newState = Object.entries(state as {}).reduce((acc, [key, value]: [string, any]) => {
			// @ts-ignore
			if (Array.isArray(value)) acc[key] = value.slice(value.length - maxArrLength)
			// @ts-ignore
			else acc[key] = value
			return acc
		}, {})
		localStorage.setItem(key, JSON.stringify(newState))
	},
		[key, state, maxArrLength]
	);
	return [state, dispatch];
}

interface Params2 {
	key: string
	value: any
}
const usePersistedState = ({ key, value }: Params2) => {
	const [state, setState] = useState(getValue(key, value))
	useEffect(() => (localStorage.setItem(key, JSON.stringify(state))), [key, state]);
	return [state, setState];
}

export { usePersistedState, usePersistedStateWithReducer }