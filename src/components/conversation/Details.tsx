import { Conversation } from '../../context/types'
import { classify, nameInitial } from '../../helpers'
import { Box } from '../../pages/Test'
import Subheader from '../Subheader'
import Avatar from '../utils/Avatar'

interface Props {
	expanded: boolean
	conversation?: Conversation
}
const ConversationDetails: React.FC<Props> = ({ expanded, conversation }) => {
	if (!conversation) return <> </>

	return (
		<div
			className={classify(
				'overflow-hidden transition-all ease-in-out duration-300 flex',
				expanded ? ' w-80' : ' w-0'
			)}
		>
			<div className="flex-1">
				<Avatar
					size="h-20 w-20"
					className="mx-auto bg-gray-100 dark:bg-gray-900 p-2"
					src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg"
				/>
				<div className="h-full bg-gray-200 dark:bg-gray-800 rounded-tl-3xl px-4 pt-14 -mt-10">
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
						{conversation.name}
					</h4>

					<div className="mt-8">
						<button className="flex justify-between" />
					</div>

					<Box _if={conversation.isGroup}>
						<Subheader text="Members" className="text-xs mt-8" />
						<div className="flex mt-4 space-x-4">
							<div className="flex-none">
								<Avatar
									size="h-24 w-24"
									className="mx-auto bg-gray-100 p-1"
									src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg"
								/>
							</div>
							<div>
								<Box
									_items={conversation.members}
									className="grid grid-cols-3 gap-2"
								>
									{(member, index) => (
										<Avatar
											key={index}
											size="h-8 w-8"
											alt={member.user.name}
											src={member.user.thumbnail}
											text={nameInitial(member.user.name)}
										/>
									)}
								</Box>
								<div className="text-center">
									<i className="cursor-pointer material-icons text-lg text-gray-500">
										expand_more
									</i>
								</div>
							</div>
						</div>
					</Box>

					<Subheader text="Photos & Videos" className="text-xs mt-8" />
					<Box
						_items={[1, 2, 3, 4, 5, 6]}
						className="grid grid-cols-3 gap-2 mt-4"
					>
						{(number) => (
							<Avatar
								key={number}
								circle={false}
								className="rounded"
								src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg"
							/>
						)}
					</Box>

					<Subheader text="Files" className="text-xs mt-8" />
				</div>
			</div>
		</div>
	)
}

export default ConversationDetails
