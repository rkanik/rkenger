import Avatar from '../utils/Avatar'
import Looper from '../utils/Looper'

import { Fragment } from 'react'
import { Box } from '../../pages/Test'
import { nameInitial } from '../../helpers'
import { IconButton } from '../utils/Button'
import { Conversation } from '../../context/types'

const placeholderSrc =
	'https://modrika.com/wp-content/uploads/avatars/1560/1560-bpfull.jpg'

interface Props {
	conversation: Conversation | null
	isConversationDetailsExpanded?: boolean
	onToggleConversationDetails?: () => void
}
const ConversationHeader: React.FC<Props> = ({
	conversation,
	isConversationDetailsExpanded = true,
	onToggleConversationDetails,
}) => {
	if (!conversation) return <Fragment />
	return (
		<div className="flex-1 p-4 pb-1">
			<div className="flex items-center shadow-md rounded-full py-2 px-3 bg-white dark:bg-gray-800">
				<Avatar
					size="h-11 w-11"
					src={conversation.group?.thumbnail || placeholderSrc}
				/>
				<div className="ml-4">
					<h4 className="text-primary">
						{conversation.isGroup
							? conversation.name
							: (conversation?.members ?? []).find((m) => m.user?.name)
									?.user?.name}
					</h4>
					<p className="text-sm text-gray-500">Active now</p>
				</div>
				<div className="ml-auto flex items-center -space-x-3">
					<IconButton
						feather="plus"
						iconSize="20"
						size="h-8 w-8"
						className="bg-gray-200 dark:bg-gray-500 text-gray-600 dark:text-gray-200 hover:next:mx-0 transition-margin"
					/>

					<Looper
						items={conversation.members}
						item={(member, index) => (
							<div
								key={index}
								style={{ zIndex: 100 - index }}
								className="relative hover:next:mx-0 transition-margin cursor-pointer"
							>
								<Avatar
									size="h-10 w-10"
									alt={member.user.name}
									src={member.user.thumbnail}
									text={nameInitial(member.user.name)}
									className="p-3px bg-white dark:bg-gray-800"
								/>
								<Box
									_if={Boolean(member.isOnline)}
									className="h-3 w-3 absolute right-0 flex items-center justify-center bottom-0 rounded-full bg-gray-50 dark:bg-gray-800"
								>
									<div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
								</Box>
							</div>
						)}
					/>
				</div>
				<div className="flex space-x-2 ml-4">
					<IconButton feather="phone" />
					<IconButton feather="video" />
					<IconButton
						feather="more_vertical"
						active={isConversationDetailsExpanded}
						onClick={() =>
							onToggleConversationDetails &&
							onToggleConversationDetails()
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default ConversationHeader
