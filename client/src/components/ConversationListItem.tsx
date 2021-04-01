import { _group } from "../consts"
import { Conversation, User } from "../context/types"
import { classify, howAgo } from "../helpers"
import Avatar from "./utils/Avatar"

const placeholderSrc = 'https://modrika.com/wp-content/uploads/avatars/1560/1560-bpfull.jpg'

interface PropsTypes {
	user: User
	active: boolean
	item: Conversation
	onClick?: (conversation: Conversation) => void
}
const ConversationListItem = ({ active, user, item, onClick }: PropsTypes) => {

	const isGroup = item.type === _group

	const avatar = (() => {
		if (item.type === _group) {
			if (item.group?.thumbnail)
				return <Avatar src={item.group?.thumbnail} size='h-full w-full' />
			const memLen = item.members.length
			return <div className='relative h-full w-full'>
				{item.members.slice(0, 2).map((m, i) => (
					<Avatar
						key={m.id} alt={m.name}
						src={m.thumbnail} size={memLen <= 2 ? 'h-8 w-8' : 'w-7 h-7'}
						className={classify([
							'absolute p-0.5 bg-gray-50 dark:bg-gray-800 shadow',
							i === 0 ? 'z-10' : 'z-20', {
								'top-0 left-1.5': memLen > 2 && i === 0,
								'top-0 right-0': memLen <= 2 && i === 0,
								'bottom-0 left-0': i === 1,
							}
						])}
					/>
				))}
				{memLen > 3 ? <Avatar
					size='w-7 h-7'
					text={memLen - 2}
					textClass='text-sm text-white'
					className='absolute shadow right-0 bottom-0 z-0 bg-pink-500'
				/> : memLen === 3 && <Avatar
					size='w-7 h-7'
					src={item.members[2].thumbnail}
					className='absolute shadow p-0.5 bg-gray-50 dark:bg-gray-800 right-0 top-7 transform -translate-y-1/2 z-0'
				/>}
			</div>
		}
		let friend = item.members.find(u => u.id !== user.id)
		if (friend) return <Avatar src={friend.thumbnail} alt={friend.name} size='h-full w-full' />
		else return <Avatar src={placeholderSrc} size='h-full w-full' />
	})()

	return (
		<div
			onClick={() => (onClick && onClick(item))}
			className={`flex relative cursor-pointer border-l-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors items-center pl-3 pr-4 py-2${active ? ' bg-gradient-to-r from-indigo-200 dark:from-indigo-900 via-gray-100 dark:via-gray-700 to-gray-100 dark:to-gray-700 border-indigo-500 dark:border-indigo-600' : ' border-transparent'}`}
		>
			{/* Avatar */}
			<div className='flex-none w-12 h-12 relative'>
				{avatar}
				<div className={classify([
					'absolute right-0 flex items-center justify-center bottom-0 rounded-full bg-gray-50 dark:bg-gray-800',
					item.members.length > 2 ? 'h-3 w-3' : 'h-4 w-4',
				])}>
					<div className={classify([
						'transform scale-90 rounded-full bg-indigo-500 dark:bg-indigo-400',
						item.members.length > 2 ? 'h-2 w-2' : 'h-3 w-3',
					])} />
				</div>
			</div>

			<div className='ml-4 flex-1'>
				<div className='flex justify-between items-center'>
					<h4 className='text-primary'>
						{isGroup ? item.group?.name : item.members[0].name}
					</h4>
					{item.lastMessage && <span className='text-xs text-gray-500'>
						{howAgo(item.lastMessage?.sentAt || '')}
					</span>}
				</div>
				<p className='text-sm single-line text-gray-500 dark:text-gray-300'>
					{item.lastMessage?.message || 'Send your first message!'}
				</p>
			</div>
		</div>
	)
}

export default ConversationListItem