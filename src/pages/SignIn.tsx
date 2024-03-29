import { useAuthContext } from '../context'
import { FormEventHandler } from 'react'
import { useState } from '../hooks'
import { useHistory } from 'react-router-dom'

const SignIn = () => {
	const history = useHistory()
	const { login } = useAuthContext()

	const [state, setState] = useState({
		isLoading: false,
		errorMessage: '',
	})
	const [user, setUser] = useState({
		username: '',
		password: '',
	})

	const onInputUser = (type: keyof typeof user) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setUser({ [type]: e.target.value })
			state.errorMessage && setState({ errorMessage: '' })
		}
	}

	const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		setState({ isLoading: true })
		const [err, res] = await login(user)
		setState({ isLoading: false })

		if (err) {
			setState({ errorMessage: res.message })
			return
		}

		history.push('/')
	}

	return (
		<div className="flex h-screen bg-indigo-700">
			<div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
				<header>
					<img
						alt="Branf Logo"
						className="w-20 mx-auto mb-5"
						src="https://img.icons8.com/fluent/344/year-of-tiger.png"
					/>
				</header>
				{state.errorMessage && (
					<div className="bg-red-500 text-white rounded px-4 py-2 mb-4 text-sm">
						{state.errorMessage}
					</div>
				)}
				<form onSubmit={onSubmit}>
					<div>
						<label
							className="block mb-2 text-indigo-500"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
							type="text"
							name="username"
							value={user.username}
							onChange={onInputUser('username')}
						/>
					</div>
					<div>
						<label
							className="block mb-2 text-indigo-500"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
							type="password"
							name="password"
							value={user.password}
							onChange={onInputUser('password')}
						/>
					</div>
					<div>
						<button
							className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
							type="submit"
							disabled={state.isLoading}
						>
							Submit
						</button>
					</div>
				</form>
				<footer>
					<a
						className="text-indigo-700 hover:text-pink-700 text-sm float-left"
						href="#forgot-password"
					>
						Forgot Password?
					</a>
					<a
						className="text-indigo-700 hover:text-pink-700 text-sm float-right"
						href="#register"
					>
						Create Account
					</a>
				</footer>
			</div>
		</div>
	)
}
export default SignIn
