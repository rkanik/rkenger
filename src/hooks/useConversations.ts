import { Conversation } from './../context/types'
import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchConversations } from '../services'
import { deepMerge } from 'deep-array'
import { useConversationsContext } from '../context/hooks'

const useConversations = () => {
	const history = useHistory()

	const { setConversations, ...context } = useConversationsContext()

	const onClickConversationItem = (conversation: Conversation) => {
		history.push(`/messages/${conversation._id}`)
	}

	const onFetchConversations = useCallback(
		async (query?: any) => {
			setConversations((v) => ({
				isLoading: !v.isLoaded,
				isRefetching: v.isLoaded,
			}))
			const [err, res] = await fetchConversations(query)
			if (!err) {
				setConversations((v) => ({
					...res.conversations,
					isLoaded: true,
					isLoading: false,
					isRefetching: false,
					data: deepMerge(v.data, res.conversations.data, '_id', 'push'),
				}))
			}
		},
		[setConversations]
	)

	useEffect(() => {
		onFetchConversations()
	}, [onFetchConversations])

	return { ...context, onFetchConversations, onClickConversationItem }
}

export { useConversations }
