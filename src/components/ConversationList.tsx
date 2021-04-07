import { Conversation } from "../context/types"

interface Props {
	item: (item: Conversation, b: number) => JSX.Element,
	classNames?: string,
	list: Conversation[]
}

const ConversationList: React.FC<Props> = ({ item, list, classNames }) => {
	return (
		<div className={`flex-1 overflow-y-auto scrollbar ${classNames || ''}`.trim()}>
			{list.map((a: Conversation, b: number) => item(a, b))}
		</div>
	)
}

export default ConversationList