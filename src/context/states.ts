import { mse } from "../enums";
import { miniId, unsplash } from "../helpers";
import {
	AuthState,
	GlobalState,
	MessagesState,

	ConversationTypes,

} from "./types";

export const globalState: GlobalState = {
	theme: {
		isDark: false
	}
}

export const authState: AuthState = {
	user: {
		id: "RKAnik",
		name: "RK Anik",
		email: "rkanik.me@gmail.com",
		thumbnail: "https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg"
	},
	isAuth: true
}

export const messagesState: MessagesState = {
	messages: [],
	conversations: [
		{
			id: '1',
			type: ConversationTypes._group,
			color: 'indigo',
			emoji: 'thumbs up',
			group: {
				name: 'Developers',
				//thumbnail: unsplash('1573166364902-982ae58a27ae')
			},
			members: [
				{
					id: miniId(),
					name: 'Amber W. Spivey',
					thumbnail: unsplash(
						'1494790108377-be9c29b29330', {
						fit: 'facearea',
						facepad: 4
					})
				},
				{
					id: miniId(),
					name: 'Michael V. Gaston',
					thumbnail: unsplash(
						'1531427186611-ecfd6d936c79', {
						fit: 'facearea',
						facepad: 4
					})
				}
			],
			lastMessage: {
				message: 'Curious what Michael means?',
				sentAt: Date.now() - mse.hour,
			},
			isStarred: false,
			isArchived: false
		},
		{
			id: '2',
			type: ConversationTypes._group,
			color: 'pink',
			emoji: 'thumbs up',
			group: {
				name: 'Best of the Best',
				//thumbnail: unsplash('1573166364902-982ae58a27ae')
			},
			members: [
				{
					id: miniId(),
					name: 'Karin Johnson',
					thumbnail: unsplash('1499952127939-9bbf5af6c51c', {
						fit: 'facearea',
						facepad: 4
					})
				},
				{
					id: miniId(),
					name: 'Larry Thomas',
					thumbnail: unsplash('1539571696357-5a69c17a67c6', {
						fit: 'facearea',
						facepad: 4
					})
				},
				{
					id: miniId(),
					name: 'Joseph N. Woody',
					thumbnail: unsplash('1533227268428-f9ed0900fb3b', {
						fit: 'facearea',
						facepad: 4
					})
				}
			],
			lastMessage: {
				message: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
				sentAt: Date.now() - mse.minute * 3,
			},
			isStarred: false,
			isArchived: false
		},
		{
			id: '3',
			type: ConversationTypes._direct,
			color: 'pink',
			emoji: 'thumbs up',
			members: [authState.user, {
				id: miniId(),
				name: 'Larry Thomas',
				thumbnail: unsplash('1539571696357-5a69c17a67c6', {
					fit: 'facearea',
					facepad: 4
				})
			}],
			lastMessage: {
				message: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
				sentAt: Date.now() - mse.minute * 3,
			},
			isStarred: false,
			isArchived: false
		}
	],
	convDetailsExpanded: false,
	conversation: null,
}