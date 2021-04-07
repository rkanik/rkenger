import { classify } from "../../helpers"
import { Icon as FeatherIconType } from 'react-feather'

type Props = {
	md?: string
	className?: string
	feather?: string
	size?: string | number
	color?: string
}

const Icon = ({
	md,
	feather,
	size = '18',
	color = 'currentColor',
	className = 'text-base'
}: Props) => {

	if (feather) {
		let FeatherIcon = require(`react-feather/dist/icons/${feather.split(/_/g).join('-')}`)
		if (!FeatherIcon) throw new Error('Icon Not Found!')
		let FIcon: FeatherIconType = FeatherIcon.default
		return <FIcon size={size} color={color} />
	}

	return (
		<i
			className={classify([
				className, {
					'material-icons': md
				}
			])}
		>
			{md || ''}
		</i>
	)
}

export default Icon