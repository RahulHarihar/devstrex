import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

const router = Router();

const sendResponse = (
	res: Response,
	status: number,
	data: unknown,
	success: boolean = true,
) => {
	return res
		.status(status)
		.json({ success, [success ? "data" : "error"]: data });
};

const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	return String(error);
};

// POST /auth/signup
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password, username } = req.body;

		const existingEmail = await UserModel.findOne({ email });
		if (existingEmail) {
			sendResponse(res, 400, "Email already in use", false);
			return;
		}

		const existingUsername = await UserModel.findOne({ username });
		if (existingUsername) {
			sendResponse(res, 400, "Username already taken", false);
			return;
		}

		const hashed = await bcrypt.hash(password, 10);
		const user = new UserModel({ email, password: hashed, username });
		await user.save();

		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: "7d" },
		);

		sendResponse(res, 201, {
			token,
			email: user.email,
			username: user.username,
		});
	} catch (error) {
		sendResponse(res, 500, getErrorMessage(error), false);
	}
});

// POST /auth/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });
		if (!user) {
			sendResponse(res, 401, "Invalid email or password", false);
			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			sendResponse(res, 401, "Invalid email or password", false);
			return;
		}

		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: "7d" },
		);

		sendResponse(res, 200, {
			token,
			email: user.email,
			username: user.username,
		});
	} catch (error) {
		sendResponse(res, 500, getErrorMessage(error), false);
	}
});

export default router;
