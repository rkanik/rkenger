import { useState, Dispatch, SetStateAction } from 'react'

import {
	get as _get,
	set as _set,
	isArray,
	isPlainObject,
	cloneDeep,
} from 'lodash'

export type FilteredKeys<T, U> = {
	[P in keyof T]: T[P] extends U ? P : never
}[keyof T]

export type FilteredValues<T, U> = { [K in FilteredKeys<T, U>]: T[K] }
export type PickArrays<T> = FilteredValues<T, unknown[]>

export type ArrayElement<ArrayType> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type Id = number | string

type PayloadRemove<State> = Partial<{
	[K in keyof PickArrays<State>]:
		| Id
		| ArrayElement<State[K]>
		| State[K]
		| {
				item?: ArrayElement<State[K]>
				items?: State[K]
				itemValue?: any | any[]
				itemKey?: keyof ArrayElement<State[K]>
		  }
}>

type RemoveByIndex<State> = Partial<{
	[K in keyof PickArrays<State>]: number | number[]
}>

type PayloadArr<State> = Partial<{
	[K in keyof PickArrays<State>]:
		| ArrayElement<State[K]>
		| {
				item?: ArrayElement<State[K]>
				items?: State[K]
				matchBy?: keyof ArrayElement<State[K]>
		  }
}>

type PathImpl<T, K extends keyof T> = K extends string
	? T[K] extends Record<string, any>
		? T[K] extends ArrayLike<any>
			?
					| K
					| `${K}.${
							| PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>
							| (keyof ArrayElement<T[K]> extends string
									? `index.${keyof ArrayElement<T[K]>}`
									: `index.path`)}`
			: K | `${K}.${PathImpl<T[K], keyof T[K]>}`
		: K
	: never

type Path<T> = PathImpl<T, keyof T> | keyof T

// @ts-ignore
type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? Rest extends Path<T[K]>
			? PathValue<T[K], Rest>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never

type PayloadSet<State> =
	| Partial<{
			// @ts-ignore
			[K in Path<State>]: PathValue<State, K>
	  }>
	| { [key: string]: any }

export type Payload<State> = {
	SET: PayloadSet<State>
	PUSH: PayloadArr<State>
	MERGE: PayloadArr<State>
	UNSHIFT: PayloadArr<State>
}

export type MutationType = keyof Payload<any>

// ========================================================
// END VUEX
// ========================================================

const SET = 'SET',
	PUSH = 'PUSH',
	RESET = 'RESET',
	UNSHIFT = 'UNSHIFT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	MERGE = 'MERGE',
	CONCAT = 'CONCAT'

export const mutations = {
	[SET]: (state: any, payload: any) => {
		if (!isPlainObject(payload)) {
			throw Error('Payload have to be an object')
		}
		Object.entries(payload).forEach(([path, value]) => {
			value = typeof value === 'function' ? value(_get(state, path)) : value
			_set(state, path, value)
		})
	},
	[RESET]: (state: any, initialState: any) => {
		mutations.SET(state, initialState)
	},
	[PUSH]: (state: any, payload: any) => {
		if (isArray(payload)) {
			let [path, ...items] = payload
			let target = _get(state, path)

			if (!target || !isArray(target)) {
				throw Error(
					'Specified state path not found or property is not an array'
				)
			}

			target.push(...items)
		} else if (isPlainObject(payload)) {
			Object.entries(payload).forEach(([path, item]) => {
				let target = _get(state, path)

				if (!target || !isArray(target)) {
					throw Error(
						'Specified state path not found or property is not an array'
					)
				}

				let items = isArray(item) ? item : [item]
				target.push(...items)
			})
		} else throw Error('Invalid payload type.')
	},
	[UNSHIFT]: (state: any, payload: any) => {
		if (isArray(payload)) {
			let [path, ...items] = payload
			let target = _get(state, path)

			if (!target || !isArray(target)) {
				throw Error(
					'Specified state path not found or property is not an array'
				)
			}

			target.unshift(...items)
		} else if (isPlainObject(payload)) {
			Object.entries(payload).forEach(([path, item]) => {
				let target = _get(state, path)

				if (!target || !isArray(target)) {
					throw Error(
						'Specified state path not found or property is not an array'
					)
				}

				let items = isArray(item) ? item : [item]
				target.unshift(...items)
			})
		} else throw Error('Invalid payload type.')
	},
	[CONCAT]: (state: any, [path, items]: any) => {
		let target = _get(state, path)

		if (!target || !isArray(target)) {
			throw Error(
				'Specified state path not found or property is not an array'
			)
		}

		_set(state, path, target.concat(items))
	},
	[DELETE]: (state: any, [path, key, match = 'id']: any) => {
		let target = _get(state, path)

		if (!target || !isArray(target)) {
			throw Error(
				'Specified state path not found or property is not an array'
			)
		}

		let keys = isArray(key) ? key : [key]
		_set(
			state,
			path,
			_get(state, path).filter((el: any) => !keys.includes(el[match]))
		)
	},
	[UPDATE]: (state: any, [path, data, match = 'id']: any) => {
		let target = _get(state, path)

		if (!target || !isArray(target)) {
			throw Error(
				'Specified state path not found or property is not an array'
			)
		}

		_set(
			state,
			path,
			_get(state, path).map((el: any) => {
				return _get(el, match) === _get(data, match) ? data : el
			})
		)
	},
	[MERGE]: (
		state: any,
		[path, items, match = 'id', type = 'unshift']: any
	) => {
		let target = _get(state, path)

		if (!target || !isArray(target)) {
			throw Error(
				'Specified state path not found or property is not an array'
			)
		}

		items.forEach((item: any) => {
			let index = target.findIndex(
				(a: any) => _get(a, match) === _get(item, match)
			)
			if (index !== -1) target.splice(index, 1, item)
			else {
				type === 'unshift' ? target.unshift(item) : target.push(item)
			}
		})
	},
}

const useSuperState = <T extends any>(
	initialValue: T
): [
	T,
	{
		setState: Dispatch<SetStateAction<T>>

		set: (payload: PayloadSet<T>) => void

		// Array
		push: (payload: PayloadArr<T>) => void
		merge: (payload: PayloadArr<T>) => void
		update: (payload: PayloadArr<T>) => void
		unshift: (payload: PayloadArr<T>) => void

		// Remove
		remove: (payload: PayloadRemove<T>) => void
		removeByIndex: (payload: RemoveByIndex<T>) => void
	}
] => {
	const [state, setState] = useState(initialValue)

	const set = (payload: PayloadSet<T>) => {}

	const push = (payload: PayloadArr<T>) => {}
	const merge = (payload: PayloadArr<T>) => {}
	const update = (payload: PayloadArr<T>) => {}
	const unshift = (payload: PayloadArr<T>) => {}

	const remove = (payload: PayloadRemove<T>) => {}
	const removeByIndex = (payload: RemoveByIndex<T>) => {
		return setState((state: any) => {
			Object.entries(payload).forEach(([path, value]) => {
				const target = _get(state, path)
				if (!target || !isArray(target)) {
					throw Error(
						'Specified state path not found or property is not an array'
					)
				}
				const indexes = isArray(value) ? value : [value]
				state = {
					...state,
					[path]: state[path].filter((_: any, index: any) => {
						return !indexes.includes(index)
					}),
				}
			})
			return { ...state }
		})
	}

	return [
		state,
		{
			set,
			setState,

			push,
			merge,
			update,
			unshift,

			remove,
			removeByIndex,
		},
	]
}

export { useSuperState }
