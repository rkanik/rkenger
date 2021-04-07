import { useRef, useState } from "react"

type Props = {
	children: JSX.Element
	className?: string
	keepMounted?: boolean
	toggler: (onClick: () => void) => JSX.Element
}
const Dropdown: React.FC<Props> = ({ children, className, toggler, keepMounted }) => {

	const wrapperEl = useRef<HTMLDivElement>(null)
	const [state, setState] = useState({
		show: false,
		hidden: true
	})

	const onMouseDown = (event: MouseEvent) => {
		console.log('onMouseDown')
		// @ts-ignore
		if (wrapperEl && !wrapperEl.current.contains(event.target)) {
			hideDropdown()
		}
	}

	const showDropdown = () => {
		setState({ show: true, hidden: false })
		document.addEventListener("mousedown", onMouseDown)
	}

	const hideDropdown = () => {
		setState(s => ({ ...s, show: false }))
		document.removeEventListener("mousedown", onMouseDown)
		setTimeout(() => (setState(s => ({ ...s, hidden: true }))), 300);
	}

	const onClickToggler = () => {
		if (state.show) hideDropdown()
		else showDropdown()
	}

	const classes = [
		className || 'top-full right-0',
		'absolute z-10 transition-all transform',
		state.show ? 'opacity-100 visible translate-y-1' : 'opacity-0 invisible translate-y-3'
	].join(' ')

	return (
		<div ref={wrapperEl} className='relative'>
			{toggler(onClickToggler)}
			<div className={classes}>
				{(!state.hidden || keepMounted) && children}
			</div>
		</div>
	)
}

export default Dropdown