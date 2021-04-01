// Enums
export enum MessageTypes {
	_text = 'text',
	_image = 'image',
	_video = 'video',
	_file = 'video'
}
export enum ConversationTypes {
	_group = 'group',
	_direct = 'direct'
}
export enum ActionTypes {
	_setState = 'setState',
	_pushTo = 'pushTo',
	_updateTo = 'updateTo',
	_deleteFrom = 'deleteFrom',
	_resetState = 'resetState'
}
export enum MessagesStateArrays {
	messages = 'messages',
	conversations = 'conversations'
}

// Schemas
export interface User {
	id: string
	name: string
	email?: string
	thumbnail: string
	friends?: string[]
}
export interface Message {
	id: string
	type: MessageTypes
	message: string
	sentAt: string
	sendBy: string
	sendTo: string
	seenBy: string | string[]
	isSeen: boolean
	isDelivered: boolean
	isForwarded?: boolean
	forwardedFrom?: boolean
	messageId?: string
}
export interface Conversation {
	id: string
	type: ConversationTypes
	color?: string
	emoji?: string
	group?: {
		name: string
		thumbnail?: string
	}
	members: User[]
	lastMessage?: {
		message: string
		sentAt: number
	}
	isStarred: boolean
	isArchived: boolean
}

// State Types
export interface GlobalState {
	theme: {
		isDark: boolean
	}
}
export interface AuthState {
	user: User;
	isAuth: boolean;
}
export interface MessagesState {
	messages: Message[],
	conversations: Conversation[],
	conversation: Conversation | null,
	convDetailsExpanded: boolean
}

// Context Types
export interface GlobalContextType extends GlobalState {
	setState: (payload: any) => void,
	resetState: () => void,
}
export interface AuthContextType extends AuthState {
	setState: (payload: any) => void;
	resetState: () => void;
}
export interface MessagesContextType extends MessagesState {
	setState: (payload: any) => void
	pushTo: (payload: [string, ...any]) => void
	updateTo: (payload: [string, any]) => void
	deleteFrom: (payload: [string, string]) => void
	resetState: () => void
}

export type Action = {
	type: ActionTypes;
	payload: any | [string, any];
}

export type Payload<S, V> = [S, V]