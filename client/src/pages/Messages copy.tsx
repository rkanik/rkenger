import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { History } from 'history';
import { MessagesContext } from "../context/MessagesContext";
import { groupify, miniId, random } from "../helpers";
import { _direct, _group } from "../consts"
import {
	AuthContextType,
	GlobalContextType,
	MessagesContextType,
	Message,
	Conversation,
	MessageTypes
} from "../context/types"

// Components
import Looper from '../components/utils/Looper'
import ConversationList from "../components/ConversationList"
import ConversationListItem from "../components/ConversationListItem"
import ConversationSubheader from "../components/ConversationSubheader"
import ProfileMenu from "../components/ProfileMenu"
import ProfileMenuToggler from "../components/ProfileMenuToggler"
import Dropdown from "../components/utils/Dropdown"
import MessageBar from "../components/MessageBar"
import MessageGroup from "../components/conversation/MessageGroup"
import ConversationHeader from "../components/conversation/Header"
import ConversationDetails from "../components/conversation/Details"
import { IconButton } from "../components/utils/Button"
import { GlobalContext } from "../context/GlobalContext"

type Props = { history: History }
const Messages: React.FC<Props> = ({ history }) => {

	const $state = useContext(GlobalContext) as GlobalContextType
	const $auth = useContext(AuthContext) as AuthContextType
	const $msg = useContext(MessagesContext) as MessagesContextType

	const groupConversations = $msg.conversations.filter(({ type }) => type === _group)
	const directConversations = $msg.conversations.filter(({ type }) => type === _direct)

	const handleSignOut = () => {
		$auth.resetState();
		history.replace('/')
	}

	const handleOnMessage = (message: string) => {
		let msg: Message = {
			message,
			id: miniId(),
			isDelivered: false,
			isSeen: false,
			seenBy: [],
			sendBy: [$auth.user.id, 'SomeoneElse'][random(1)],
			sendTo: 'other',
			sentAt: new Date().toString(),
			type: MessageTypes._text
		}
		$msg.pushTo(['messages', msg])
	}

	// Methods
	const isMe = (id: string) => $auth.user.id === id

	const handleClickConversation =
		(conversation: Conversation) => {
			$msg.setState({ conversation })
		}

	const toggleConvDetails = () => {
		$msg.setState({
			convDetailsExpanded: !$msg.convDetailsExpanded
		})
	}

	const handleChangeTheme = () => {
		$state.setState({
			theme: {
				isDark: !$state.theme.isDark
			}
		})
	}

	const handleDeleteMessage = (id: string) => {
		$msg.deleteFrom(['messages', id])
	}

	// Computed
	const msgGroups = groupify(
		$msg.messages,
		'sendBy', 'messages',
		['sentAt', 'sendBy']
	).reverse()

	useEffect(() => {
		$auth.setState({
			isAuth: true,
			user: {
				email: "rkanik.me@gmail.com",
				friends: [],
				id: "RKAnik",
				name: "RK Anik",
				thumbnail: "https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg"
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='flex h-screen'>
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
			<div className='flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden'>
				<div className='flex-none flex pb-0 z-10'>
					<div className='flex-1 p-4 pb-1'>
						<ConversationHeader
							conversation={$msg.conversation}
							isConversationDetailsExpanded={$msg.convDetailsExpanded}
							onToggleConversationDetails={toggleConvDetails}
						/>
					</div>
					{/* Top Right Bar */}
					<div className='w-72 p-4 flex items-center justify-end'>
						<IconButton
							md={$state.theme.isDark ? "brightness_4" : "wb_sunny"}
							onClick={handleChangeTheme}
						/>
						<Dropdown
							className='shadow-md top-full right-0'
							toggler={(onClick: () => void) =>
								<ProfileMenuToggler
									onClick={onClick}
									name={$auth.user.name}
									src={$auth.user.thumbnail}
									className='ml-2'
								/>
							}
						>
							<ProfileMenu user={$auth.user} signOut={handleSignOut} />
						</Dropdown>
					</div>
				</div>
				<div className='flex-1 flex overflow-hidden'>
					<div className='flex-1 flex flex-col'>
						<div className='flex-1 flex flex-col relative overflow-hidden'>
							<div className='absolute bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent inset-x-0 top-0 h-12' />
							<div className='p-4 pt-12 overflow-y-auto flex flex-col-reverse scrollbar'>
								<Looper
									items={msgGroups}
									item={(item, key) => <MessageGroup
										key={key}
										msgGroup={item}
										isMe={isMe(item.sendBy)}
										onDelete={handleDeleteMessage}
									/>}
								/>
							</div>
						</div>
						<MessageBar
							onMessage={handleOnMessage}
						/>
					</div>

					<ConversationDetails
						expanded={$msg.convDetailsExpanded}
						conversation={$msg.conversation}
					/>

				</div>
			</div>
		</div>
	)
}
export default Messages