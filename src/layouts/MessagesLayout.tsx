import { useAuthContext } from '../context'
import { useConversations } from '../hooks'
import { IconButton } from '../components/utils/Button'

import ConversationList from '../components/ConversationList'
import ConversationListItem from '../components/ConversationListItem'

interface Props {}

const MessagesLayout: React.FC<Props> = ({ children }) => {
	const $auth = useAuthContext()

	const { conversations, onClickConversationItem } = useConversations()

	console.log(conversations.data)

	return (
		<div className="flex flex-col h-screen">
			<div className="flex h-full ">
				<div className="flex-none flex flex-col w-80 bg-gray-200 dark:bg-gray-800">
					<div className="flex-none flex justify-between items-center p-4">
						<h4 className="text-2xl font-medium flex items-center text-gray-900 dark:text-gray-100">
							<span>Messages</span>
							<span className="inline-flex h-4 w-4 bg-red-500 font-normal ml-2 text-white items-center justify-center text-xs rounded-full">
								5
							</span>
						</h4>
						<IconButton size="h-9 w-9" feather="search" />
					</div>
					<div className="flex-none flex justify-between text-sm py-2 px-4 text-gray-700">
						<button className="font-medium text-indigo-700">
							All Conversations
						</button>
						<button className="font-medium">Archived</button>
						<button className="font-medium">Starred</button>
					</div>

					<div className="overflow-hidden flex-1 flex flex-col pt-2">
						{/* <ConversationSubheader text="Direct" /> */}
						<ConversationList
							classNames="mt-2"
							list={conversations.data}
							item={(item, index) => (
								<ConversationListItem
									key={index}
									item={item}
									user={$auth.currentUser}
									onClick={onClickConversationItem}
									active={false}
								/>
							)}
						/>
					</div>
				</div>

				<div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden">
					{children}
				</div>
			</div>
		</div>
	)
}

export default MessagesLayout
