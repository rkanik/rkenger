import { PartialPayload } from './../types'
import { useCallback } from 'react'

const usePartialSetState = <S, T extends (payload: any) => void = any>(
	setState: T
) => {
	console.log('usePartialSetState')
	const setPartialState = useCallback(
		(payload: PartialPayload<S>) => {
			console.log('setPartialState::useCallback')

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
