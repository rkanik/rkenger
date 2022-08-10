import { useState, Dispatch, SetStateAction } from 'react'
import { usePartialSetState } from './usePartialSetState'

const useSuperState = <T extends any>(
	initialValue: T
): [
	T,
	{
		setState: Dispatch<SetStateAction<T>>
		setPartialState: (payload: Partial<T> | ((v: T) => Partial<T>)) => void
	}
] => {
	const [state, setState] = useState(initialValue)
	const setPartialState = usePartialSetState<T>(setState)

	return [
		state,
		{
			setState,
			setPartialState,
		},
	]
}

export { useSuperState }
