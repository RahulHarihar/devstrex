import type { AuthPayload, User } from "../types";

const BASE_URL = "http://localhost:3000/auth";

export const signup = async (payload: AuthPayload): Promise<User> => {
	const res = await fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
	const res = await fetch(`${BASE_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error);
	return json.data;
};

export const getToken = (): string | null => localStorage.getItem("token");
export const getUsername = (): string | null =>
	localStorage.getItem("username");

export const saveAuth = (user: User): void => {
	localStorage.setItem("token", user.token);
	localStorage.setItem("username", user.username);
	localStorage.setItem("email", user.email);
};

export const clearAuth = (): void => {
	localStorage.removeItem("token");
	localStorage.removeItem("username");
	localStorage.removeItem("email");
};
