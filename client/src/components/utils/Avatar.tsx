import { classify, letter } from "../../helpers"

type PropsTypes = {
	alt?: string
	src?: string
	circle?: boolean
	size?: string | number
	className?: string
	text?: string | number
	textClass?: string
}

const Avatar = ({ alt, src, text, size = '', circle = true, className = '', textClass }: PropsTypes) => {

	className = !className.includes('absolute')
		? className + ' relative'
		: className

	return (
		<div className={classify([
			size, className,
			'overflow-hidden', {
				'rounded-full': circle
			}])}
		>
			{src ? <img
				src={src} alt={alt || ''}
				className={classify([
					'h-full w-full object-cover object-center', {
						'rounded-full': circle
					}
				])}
			/> : <div className='h-full w-full grid place-items-center'>
				<p className={textClass || 'text-base font-semibold'}>{text || letter()}</p>
			</div>}
		</div>
	)
}

export default Avatar