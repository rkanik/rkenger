import { PartialPayload } from './../types'
import { useCallback } from 'react'

const usePartialSetState = <S, T extends (payload: any) => void = any>(
	setState: T
) => {
	const setPartialState = useCallback(
		(payload: PartialPayload<S>) => {
			return setState((state: S) => ({
				...state,
				...(typeof payload === 'function' ? payload(state) : payload),
			}))
		},
		[setState]
	)
	return setPartialState
}

export { usePartialSetState }
