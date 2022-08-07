import { withRouter } from 'react-router-dom'
import { useCurrentConversation, useMessages } from '../hooks'

import ConversationHeader from '../components/conversation/Header'
import { ConversationActionsHeader } from '../components/conversation/ConversationActionsHeader'
import ConversationDetails from '../components/conversation/Details'
import MessageBar from '../components/MessageBar'
import Message from '../components/conversation/Message'
import { MessageTypes } from '../context/types'

const Conversation = withRouter(({ match }) => {
	const { currentConversation, onSendMessage } = useCurrentConversation()
	const { messagesGroup } = useMessages(match.params.id)

	const onMessage = (content: string) => {
		return onSendMessage({
			text: content,
			type: MessageTypes._text,
		})
	}

	return (
		<div>
			<div className="flex-none flex pb-0 z-10">
				<ConversationHeader conversation={currentConversation} />
				<ConversationActionsHeader />
			</div>
			<div className="flex-1 flex overflow-hidden">
				<div className="flex-1 flex flex-col">
					<div className="flex-1 flex flex-col relative overflow-hidden">
						<div className="absolute bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent inset-x-0 top-0 h-12" />
						<div className="p-4 pt-12 overflow-y-auto flex flex-col-reverse scrollbar">
							{messagesGroup.map(({ sender, messages }, key) => {
								return (
									<div key={key}>
										<div>
											<div>{sender.name}</div>
										</div>
										<div className="flex flex-col space-y-1">
											{messages.map((message, i) => {
												return (
													<Message
														key={i}
														msg={message}
														index={i}
														isMe={false}
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
