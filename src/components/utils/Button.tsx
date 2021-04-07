import Icon from "./Icon"
import { classify } from "../../helpers"
import { _buttonTypes } from "../../enums"

type Props = {
	type?: _buttonTypes;
	md?: string;
	size?: string;
	icon?: boolean;
	children?: JSX.Element[];
	className?: string;
	// Feather
	feather?: string
	iconColor?: string
	iconSize?: string | number;
	iconClass?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({
	md,
	size,
	icon,
	children,
	className,
	iconClass,
	type = _buttonTypes.button,
	// Feather
	feather,
	iconSize,
	iconColor,
	onClick
}: Props) => {
	if (icon)
		return <IconButton
			md={md}
			type={type}
			size={size}
			// Feather
			feather={feather}
			iconSize={iconSize}
			iconColor={iconColor}
			className={className || 'bg-gray-200 hover:bg-gray-300'}
			iconClass={iconClass || 'text-base text-gray-500'}
			onClick={onClick}
		/>
	return (
		<button onClick={e => (onClick && onClick(e))} className={className || ''}>
			{children}
		</button>
	)
}

type IBProps = {
	md?: string
	size?: string
	active?: boolean
	activeClass?: string
	type?: _buttonTypes
	className?: string
	iconClass?: string

	// Feather
	feather?: string
	iconColor?: string
	iconSize?: string | number;

	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const IconButton = ({
	md, type, active,
	size = 'h-10 w-10',
	activeClass,
	className,
	iconClass,

	// Feather
	feather,
	iconColor,
	iconSize,

	onClick
}: IBProps) => {

	className = className || 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
	activeClass = activeClass || 'bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-gray-700 dark:text-gray-300'
	if (active) className = classify(className, activeClass)

	return (
		<button
			type={type}
			onClick={e => (onClick && onClick(e))}
			className={classify(size, className,
				'rounded-full grid place-items-center transition-colors',
			)}>
			{md && <Icon
				md={md}
				className={iconClass || ''}
			/>}
			{feather && <Icon
				feather={feather}
				color={iconColor}
				size={iconSize}
				className={iconClass}
			/>}
		</button>
	)
}

export { Button, IconButton }
export default Button