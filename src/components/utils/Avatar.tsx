import cn from 'classnames'

import { useMemo } from 'react'
import { letter, nameInitial } from '../../helpers'

type PropsTypes = {
	alt?: string
	src?: string
	circle?: boolean
	size?: string | number
	className?: string
	text?: string | number
	textClass?: string
}

const Avatar = ({
	alt,
	src,
	text,
	size = '',
	circle = true,
	className = '',
	textClass,
}: PropsTypes) => {
	className = !className.includes('absolute')
		? className + ' relative'
		: className

	const initial = useMemo(() => {
		if (text) return text
		if (alt) return nameInitial(alt)
		return letter() + letter()
	}, [text, alt])

	return (
		<div
			className={cn([
				size,
				className,
				'overflow-hidden',
				{
					'rounded-full': circle,
				},
			])}
		>
			{src ? (
				<img
					src={src}
					alt={alt || ''}
					className={cn([
						'h-full w-full object-cover object-center',
						{
							'rounded-full': circle,
						},
					])}
				/>
			) : (
				<div className="h-full w-full grid place-items-center bg-gray-400 dark:bg-gray-600 dark:text-white">
					<p className={textClass || 'text-base font-normal'}>{initial}</p>
				</div>
			)}
		</div>
	)
}

export default Avatar
