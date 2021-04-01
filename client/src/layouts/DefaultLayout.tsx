type PropsTypes = {
	children: JSX.Element
}

const DefaultLayout = ({ children }: PropsTypes) => (
	<div className='default-layout'>
		<main>
			{children}
		</main>
	</div>
)

export default DefaultLayout