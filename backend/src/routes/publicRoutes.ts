import { Router, Request, Response } from "express";
import { UserModel } from "../models/User";
import { ChallengeModel } from "../models/Challenge";
import { LogModel } from "../models/Log";

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

// GET /public/:username
router.get("/:username", async (req: Request, res: Response): Promise<void> => {
	try {
		const { username } = req.params;

		const user = await UserModel.findOne({ username });
		if (!user) {
			sendResponse(res, 404, "User not found", false);
			return;
		}

		const challenges = await ChallengeModel.find({
			userId: user._id,
			isPublic: true,
		}).sort({ createdAt: -1 });

		const challengesWithLogs = await Promise.all(
			challenges.map(async (challenge) => {
				const logs = await LogModel.find({ challengeId: challenge._id }).sort({
					day: 1,
				});
				const completedDays = logs.filter((l) => l.completed).length;
				const streak = calculateStreak(logs.map((l) => l.day));

				return {
					challenge,
					logs,
					completedDays,
					streak,
				};
			}),
		);

		sendResponse(res, 200, {
			username: user.username,
			challenges: challengesWithLogs,
		});
	} catch (error) {
		sendResponse(res, 500, getErrorMessage(error), false);
	}
});

// Helper — calculate current streak from completed day numbers
const calculateStreak = (completedDays: number[]): number => {
	if (completedDays.length === 0) return 0;
	const sorted = [...completedDays].sort((a, b) => b - a);
	let streak = 1;
	for (let i = 0; i < sorted.length - 1; i++) {
		if (sorted[i] - sorted[i + 1] === 1) {
			streak++;
		} else {
			break;
		}
	}
	return streak;
};

export default router;
