import { User } from "../context/types"
import Avatar from "./utils/Avatar"
import Icon from "./utils/Icon"

interface Props {
	user: User
	signOut?: () => void
}
const ProfileMenu = ({ user, signOut }: Props) => {
	const { name, email, thumbnail } = user
	return (
		<div className='pt-6 pb-2 bg-white rounded-b w-52'>
			<Avatar
				alt={name}
				src={thumbnail}
				size='h-16 w-16'
				className='mx-auto'
			/>
			<div className='text-center mt-4 px-4'>
				<h4 className='text-base font-semibold text-gray-800'>{name}</h4>
				<p className='text-sm text-gray-500'>{email}</p>
			</div>
			<div className='mt-4 flex flex-col'>
				<button className='flex items-center font-medium text-sm px-4 py-1 text-gray-600 hover:bg-gray-100 transition-colors'>
					<Icon md='account_circle' className='text-gray-500 text-lg' />
					<span className='ml-3'>My Profile</span>
				</button>
				<button onClick={() => (signOut && signOut())} className='flex items-center font-medium text-sm px-4 py-1 hover:bg-gray-100 text-gray-600 transition-colors'>
					<Icon md='logout' className='text-gray-500 text-lg' />
					<span className='ml-3'>Sign Out</span>
				</button>
			</div>
		</div>
	)
}
export default ProfileMenu