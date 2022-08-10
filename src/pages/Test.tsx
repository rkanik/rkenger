import { useSuperState } from '../hooks'

const Test = () => {
	const [state, {}] = useSuperState({
		loading: false,
		others: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		nested: {
			numbers: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
		users: [
			{
				id: 1,
				name: 'RK Anik',
			},
			{
				id: 2,
				name: 'John doe',
			},
			{
				id: 3,
				name: 'User 3',
			},
			{
				id: 4,
				name: 'User 4',
			},
			{
				id: 5,
				name: 'User 5',
			},
		],
	})

	const onRemoveByIndex = () => {
		// removeByIndex({ users: 0, others: [0, 1] })
	}

	return (
		<div className="container mx-auto py-16">
			<h1>Test</h1>
			<p>This is a test page</p>

			<button onClick={onRemoveByIndex}>Remove By Index</button>

			<pre>
				<code>{JSON.stringify(state.others)}</code>
				<code>{JSON.stringify(state.users, null, 3)}</code>
			</pre>
		</div>
	)
}

export { Test }
