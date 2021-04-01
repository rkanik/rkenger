import { Fragment } from "react"
import { Message as MessageType } from "../../context/types"
import { classify } from "../../helpers"
import Button from "../utils/Button"
import Dropdown from "../utils/Dropdown"

type Props = {
	index: number
	isMe: boolean
	msg: MessageType
	msgsLen: number
	onDelete?: (id: string) => void
}
const Message: React.FC<Props> = ({ isMe, msg, index, msgsLen, onDelete }) => {

	// Methods
	const handleDelete = () => {
		onDelete && onDelete(msg.id)
	}

	// Computed
	const radius = isMe ? {
		'rounded-br-none': index === 0 && msgsLen === 1,
		'rounded-b-none': index === 0 && msgsLen > 1,
		'rounded-t-none': msgsLen > 1 && index === msgsLen - 1,
		'rounded-b-none rounded-tr-none': index > 0 && index < msgsLen - 1,
	} : {
		'rounded-bl-none': index === 0 && msgsLen === 1,
		'rounded-b-none': index === 0 && msgsLen > 1,
		'rounded-t-none': msgsLen > 1 && index === msgsLen - 1,
		'rounded-b-none rounded-tl-none': index > 0 && index < msgsLen - 1
	}

	return (
		<Fragment>
			<div className={`group items-center${isMe ? ' flex flex-row-reverse' : ' flex'}`}>
				<p className={classify([
					radius, 'inline-block p-3 text-white dark:text-gray-100 text-base rounded-xl',
					isMe ? 'bg-gray-600 dark:bg-gray-700' : 'bg-indigo-500',
				])}>{msg.message}</p>
				<div className={classify([
					'flex opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200',
					isMe ? 'mr-2' : 'ml-2', {
						'flex-row-reverse': isMe
					}
				])}>
					<Button
						icon
						md='insert_emoticon'
						size='h-6 w-6'
						className='bg-gray-200 dark:bg-gray-600'
						iconClass='text-sm text-gray-500 dark:text-gray-400'
					/>
					<Button
						icon
						md='reply'
						size='h-6 w-6'
						className='bg-gray-200 dark:bg-gray-600 mx-1'
						iconClass='text-sm text-gray-500 dark:text-gray-400'
					/>
					<Dropdown
						className='shadow-md'
						toggler={(onClick: () => void) =>
							<Button
								icon
								md='more_vert'
								size='h-6 w-6'
								className='bg-gray-200 dark:bg-gray-600'
								iconClass='text-sm text-gray-500 dark:text-gray-400'
								onClick={onClick}
							/>
						}
					>
						<div className='bg-white dark:bg-gray-500  rounded overflow-hidden flex flex-col text-center'>
							<button className='py-2 px-4 text-sm text-gray-700 dark:text-gray-200 opacity-80 hover:opacity-100'>Edit</button>
							<button onClick={handleDelete} className='py-2 px-4 text-sm text-gray-700 dark:text-gray-200 opacity-80 hover:opacity-100'>Delete</button>
						</div>
					</Dropdown>
				</div>
			</div>
		</Fragment>
	)
}

export default Message