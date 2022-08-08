import { withRouter } from 'react-router-dom'
import { useCurrentConversation } from '../hooks'

import ConversationHeader from '../components/conversation/Header'
import { ConversationActionsHeader } from '../components/conversation/ConversationActionsHeader'
import ConversationDetails from '../components/conversation/Details'
import MessageBar from '../components/MessageBar'
import Message from '../components/conversation/Message'
import { MessageTypes } from '../context/types'
import cn from 'classnames'
import moment from 'moment'

const Conversation = withRouter(({ match }) => {
	const { currentConversation, onSendMessage, messagesGroup } =
		useCurrentConversation()

	const onMessage = (content: string) => {
		return onSendMessage({
			text: content,
			type: MessageTypes._text,
		})
	}

	return (
		<div className="flex-1 flex flex-col overflow-hidden">
			<div className="flex-none flex pb-0 z-10">
				<ConversationHeader conversation={currentConversation} />
				<ConversationActionsHeader />
			</div>
			<div className="flex-1 flex overflow-hidden">
				<div className="flex-1 flex flex-col overflow-hidden">
					<div className="flex-1 flex flex-col relative overflow-hidden">
						<div className="absolute bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent inset-x-0 top-0 h-12" />
						<div className="flex-1 p-4 pt-12 overflow-y-auto flex flex-col-reverse scrollbar">
							{messagesGroup.map(({ sender, messages, isMine }, key) => {
								return (
									<div key={key}>
										<div
											className={cn(
												'flex space-x-4 dark:text-white items-center mb-4',
												{
													'flex-row-reverse': isMine,
													'space-x-reverse': isMine,
												}
											)}
										>
											<div>RK</div>
											<div
												className={cn({
													'text-right': isMine,
												})}
											>
												<div className="leading-none text-base font-medium">
													{sender.name}
												</div>
												<div
													className={cn(
														'text-xs opacity-70 flex',
														{
															'flex-row-reverse': isMine,
														}
													)}
												>
													<span>{sender.username}</span>
													<span className="mx-1">•</span>
													<span>
														{moment(
															messages[0].createdAt
														).fromNow()}
													</span>
												</div>
											</div>
										</div>
										<div className="flex flex-col-reverse space-y-1 space-y-reverse">
											{messages.map((message, i) => {
												return (
													<Message
														key={i}
														msg={message}
														index={i}
														isMe={isMine}
														msgsLen={messages.length}
														onDelete={(id: string) => {}}
													/>
												)
											})}
										</div>
									</div>
								)
							})}
							{/* <pre>
								<code>{JSON.stringify(messagesGroup, null, 4)}</code>
							</pre> */}

							{/* <Looper
								items={msgGroups}
								item={(item, key) => (
									<MessageGroup
										key={key}
										msgGroup={item}
										isMe={isMe(item.sendBy)}
										onDelete={handleDeleteMessage}
									/>
								)}
							/> */}
						</div>
					</div>
					<MessageBar onMessage={onMessage} />
				</div>

				<ConversationDetails
					expanded={true}
					conversation={currentConversation}
				/>
			</div>
		</div>
	)
})

export default Conversation
