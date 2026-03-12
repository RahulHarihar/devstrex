import { Router, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ChallengeModel } from "../models/Challenge";
import { LogModel } from "../models/Log";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

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

// All routes protected
router.use(authMiddleware);

// POST /challenges
router.post("/", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { title, description, totalDays, startDate, tasks, isPublic } =
			req.body;

		const challenge = new ChallengeModel({
			userId: req.userId,
			title,
			description,
			totalDays,
			startDate,
			tasks,
			isPublic,
		});

		const saved = await challenge.save();
		sendResponse(res, 201, saved);
	} catch (error) {
		sendResponse(res, 400, getErrorMessage(error), false);
	}
});

// GET /challenges
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const challenges = await ChallengeModel.find({ userId: req.userId }).sort({
			createdAt: -1,
		});
		sendResponse(res, 200, challenges);
	} catch (error) {
		sendResponse(res, 500, getErrorMessage(error), false);
	}
});

// GET /challenges/:id
router.get("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			sendResponse(res, 400, "Invalid ID format", false);
			return;
		}

		const challenge = await ChallengeModel.findOne({
			_id: id,
			userId: req.userId,
		});
		if (!challenge) {
			sendResponse(res, 404, "Challenge not found", false);
			return;
		}

		const logs = await LogModel.find({ challengeId: id }).sort({ day: 1 });
		sendResponse(res, 200, { challenge, logs });
	} catch (error) {
		sendResponse(res, 500, getErrorMessage(error), false);
	}
});

// PUT /challenges/:id
router.put("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			sendResponse(res, 400, "Invalid ID format", false);
			return;
		}

		const { title, description, totalDays, isPublic } = req.body;

		const updated = await ChallengeModel.findOneAndUpdate(
			{ _id: id, userId: req.userId },
			{ title, description, totalDays, isPublic },
			{ new: true, runValidators: true },
		);

		if (!updated) {
			sendResponse(res, 404, "Challenge not found", false);
			return;
		}

		sendResponse(res, 200, updated);
	} catch (error) {
		sendResponse(res, 400, getErrorMessage(error), false);
	}
});

// DELETE /challenges/:id
router.delete(
	"/:id",
	async (req: AuthRequest, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			if (!isValidObjectId(id)) {
				sendResponse(res, 400, "Invalid ID format", false);
				return;
			}

			const deleted = await ChallengeModel.findOneAndDelete({
				_id: id,
				userId: req.userId,
			});
			if (!deleted) {
				sendResponse(res, 404, "Challenge not found", false);
				return;
			}

			// Delete all logs for this challenge
			await LogModel.deleteMany({ challengeId: id });

			sendResponse(res, 200, deleted);
		} catch (error) {
			sendResponse(res, 500, getErrorMessage(error), false);
		}
	},
);

export default router;
