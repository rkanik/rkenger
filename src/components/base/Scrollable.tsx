import { useEffect, useRef, useState } from 'react'

type ScrollableProps = {
	once?: boolean
	offset?: number
	className?: string
	onBottom?: () => void
}
const Scrollable: React.FC<ScrollableProps> = ({
	children,
	offset = 200,
	once = false,
	className = '',
	onBottom = () => {},
}) => {
	const ref = useRef<HTMLDivElement>(null)

	const [isEventsFired, setIsEventsFired] = useState(false)
	const [isEnterredToBottom, setIsEnterredToBottom] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const onScroll = () => {
			if (
				el.clientHeight + offset >=
				el.scrollHeight - Math.abs(el.scrollTop)
			) {
				if (isEnterredToBottom) return
				setIsEnterredToBottom(true)

				if (once && isEventsFired) return

				onBottom()
				setIsEventsFired(true)

				if (once) unbound()
			}
			//
			else {
				setIsEnterredToBottom(false)
			}
		}

		const bound = () => el.addEventListener('scroll', onScroll)
		const unbound = () => el.removeEventListener('scroll', onScroll)

		unbound()
		bound()

		return () => unbound()
	}, [isEventsFired, isEnterredToBottom, once, offset, onBottom])

	return (
		<div className={className} ref={ref}>
			{children}
		</div>
	)
}

export { Scrollable }
