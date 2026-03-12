export interface User {
	email: string;
	username: string;
	token: string;
}

export interface Task {
	day: number;
	title: string;
}

export interface Challenge {
	_id: string;
	userId: string;
	title: string;
	description: string;
	totalDays: number;
	startDate: string;
	tasks: Task[];
	isPublic: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Log {
	_id: string;
	userId: string;
	challengeId: string;
	day: number;
	note: string;
	completed: boolean;
	createdAt: string;
}

export interface PublicChallenge {
	challenge: Challenge;
	logs: Log[];
	completedDays: number;
	streak: number;
}

export interface PublicProfile {
	username: string;
	challenges: PublicChallenge[];
}

export interface AuthPayload {
	email: string;
	password: string;
	username?: string;
}
