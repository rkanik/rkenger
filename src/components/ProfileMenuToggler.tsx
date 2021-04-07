import Icon from "./utils/Icon"

type Props = {
	src: string;
	name: string;
	className?: string
	onClick: () => void
}
const ProfileMenuToggler = ({ src, name, className, onClick }: Props) => (
	<button type='button' onClick={onClick} className={`flex items-center p-1${' ' + className || ''}`}>
		<div className='h-9 w-9 rounded-full relative overflow-hidden shadow'>
			<img src={src} alt={name} className='h-full w-full' />
		</div>
		<div className='flex items-center bg-gray-200 shadow pl-6 -ml-4 py-1 pr-2 rounded-full rounded-l-none'>
			<h5 className='text-sm'>{name}</h5>
			<Icon md='expand_more' className="text-gray-400 text-base ml-1" />
		</div>
	</button>
)
export default ProfileMenuToggler