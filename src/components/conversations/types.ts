interface user {
	isOnline: boolean;
	fullName: string;
	thumbnail: string;
}

interface group {
	members: number;
	name: string;
}

interface message {
	isSeen: boolean;
	sentAt: string;
	message: string;
}

export interface item {
	type: string;
	messages: message[];
	user?: user;
	group?: group;
	members?: user[];
}