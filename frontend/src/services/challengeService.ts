import type { Challenge, Log } from "../types";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:3000";

const authHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${getToken()}`,
});

export const getChallenges = async (): Promise<Challenge[]> => {
	const res = await fetch(`${BASE_URL}/challenges`, { headers: authHeaders() });
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const getChallenge = async (
	id: string,
): Promise<{ challenge: Challenge; logs: Log[] }> => {
	const res = await fetch(`${BASE_URL}/challenges/${id}`, {
		headers: authHeaders(),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const createChallenge = async (
	payload: Partial<Challenge>,
): Promise<Challenge> => {
	const res = await fetch(`${BASE_URL}/challenges`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const deleteChallenge = async (id: string): Promise<void> => {
	const res = await fetch(`${BASE_URL}/challenges/${id}`, {
		method: "DELETE",
		headers: authHeaders(),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
};

export const createLog = async (payload: {
	challengeId: string;
	day: number;
	note: string;
	completed: boolean;
}): Promise<Log> => {
	const res = await fetch(`${BASE_URL}/logs`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const updateLog = async (
	id: string,
	payload: Partial<Log>,
): Promise<Log> => {
	const res = await fetch(`${BASE_URL}/logs/${id}`, {
		method: "PUT",
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const getPublicProfile = async (username: string) => {
	const res = await fetch(`${BASE_URL}/public/${username}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};
