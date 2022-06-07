const SignIn = () => {
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
				<form>
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
						/>
					</div>
					<div>
						<input
							className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
							type="submit"
						/>
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
