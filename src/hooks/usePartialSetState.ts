const usePartialSetState = <S, T extends (payload: any) => void>(
	setState: T
) => {
	const setPartialState = (partialState: Partial<S>) => {
		setState((prevState: S) => ({ ...prevState, ...partialState }))
	}

	return setPartialState
}

export { usePartialSetState }
