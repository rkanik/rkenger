import { Message as MessageType } from "../../context/types"
import { classify, howAgo } from "../../helpers"
import { MsgGroup } from "../../types"
import Message from "./Message"

type Props = {
	isMe: boolean
	msgGroup: MsgGroup
	onDelete?: (id: string) => void
}
const MessageGroup: React.FC<Props> = ({ isMe, msgGroup: { messages, sentAt }, onDelete }) => {
	return (
		<div className={classify([`flex items-end w-8/12`, { 'ml-auto flex-row-reverse': isMe }])}>
			<div className='flex-none h-6 w-6 rounded-full overflow-hidden relative mb-5'>
				<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
			</div>
			<div className={`${isMe ? 'mr-2 text-right' : 'ml-2'}`}>
				<div className='space-y-1'>
					{messages.map((msg: MessageType, i: number) => (
						<Message
							key={i} msg={msg}
							index={i} isMe={isMe}
							msgsLen={messages.length}
							onDelete={(id: string) => (onDelete && onDelete(id))}
						/>
					))}
				</div>
				<p className='text-xs text-gray-400 mt-1'>{howAgo(sentAt)}</p>
			</div>
		</div>
	)
}

export default MessageGroup