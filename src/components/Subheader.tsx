type Props = {
	text: string,
	className?: string
}
const Subheader = ({ text, className = 'text-xs px-4' }: Props) => (
	<div className={`${className} uppercase flex-none font-medium text-gray-500 tracking-wide`.trim()}>
		{text}
	</div>
)
export default Subheader