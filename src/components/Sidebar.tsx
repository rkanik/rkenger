import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import { MessagesContext } from "../context/MessagesContext";

import ConversationList from "./ConversationList"
import ConversationListItem from "./ConversationListItem"
import ConversationSubheader from "./ConversationSubheader"

import { AuthContextType, Conversation, MessagesContextType } from "../context/types"
import { IconButton } from "./utils/Button"
import { _direct, _group } from "../consts";

interface Props { }

const Sidebar: React.FC<Props> = ({ }) => {

	const $auth = useContext<AuthContextType>(AuthContext)
	const $msg = useContext<MessagesContextType>(MessagesContext)

	const groupConversations = $msg.conversations.filter(({ type }) => type === _group)
	const directConversations = $msg.conversations.filter(({ type }) => type === _direct)

	const handleClickConversation =
		(conversation: Conversation) => {
			$msg.setState({ conversation })
		}

	return (
		<div className='flex-none flex flex-col w-80 bg-gray-200 dark:bg-gray-800'>
			<div className='flex-none flex justify-between items-center p-4'>
				<h4 className='text-2xl font-medium flex items-center text-gray-900 dark:text-gray-100'>
					<span>Messages</span>
					<span className='inline-flex h-4 w-4 bg-red-500 font-normal ml-2 text-white items-center justify-center text-xs rounded-full'>5</span>
				</h4>
				<IconButton
					size='h-9 w-9'
					feather='search'
				/>
			</div>
			<div className='flex-none flex justify-between text-sm py-2 px-4 text-gray-700'>
				<button className='font-medium text-indigo-700'>All Conversations</button>
				<button className='font-medium'>Archived</button>
				<button className='font-medium'>Starred</button>
			</div>
			<div className='overflow-hidden max-h-56 flex-1 flex flex-col pt-2'>
				<ConversationSubheader text='Groups' />
				<ConversationList
					classNames='mt-2'
					list={groupConversations}
					item={(item: Conversation, index: number) =>
						<ConversationListItem
							key={index}
							item={item}
							user={$auth.user}
							onClick={handleClickConversation}
							active={$msg.conversation?.id === item.id}
						/>
					}
				/>
			</div>
			<div className='overflow-hidden flex-1 flex flex-col pt-2'>
				<ConversationSubheader text='Direct' />
				<ConversationList
					classNames='mt-2'
					list={directConversations}
					item={(item: Conversation, index: number) =>
						<ConversationListItem
							key={index}
							item={item}
							user={$auth.user}
							onClick={handleClickConversation}
							active={$msg.conversation?.id === item.id}
						/>
					}
				/>
			</div>
		</div>
	)
}

export default Sidebar