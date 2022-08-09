const usePartialSetState = <S, T extends (payload: any) => void = any>(
	setState: T
) => {
	const setPartialState = (payload: Partial<S> | ((v: S) => Partial<S>)) => {
		return setState((state: S) => ({
			...state,
			...(typeof payload === 'function' ? payload(state) : payload),
		}))
	}
	return setPartialState
}

export { usePartialSetState }
