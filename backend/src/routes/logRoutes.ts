import { Router, Response } from "express";
import { isValidObjectId } from "mongoose";
import { LogModel } from "../models/Log";
import { ChallengeModel } from "../models/Challenge";
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

router.use(authMiddleware);

// POST /logs
router.post("/", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { challengeId, day, note, completed } = req.body;

		if (!isValidObjectId(challengeId)) {
			sendResponse(res, 400, "Invalid challenge ID", false);
			return;
		}

		// Verify challenge belongs to user
		const challenge = await ChallengeModel.findOne({
			_id: challengeId,
			userId: req.userId,
		});
		if (!challenge) {
			sendResponse(res, 404, "Challenge not found", false);
			return;
		}

		const log = new LogModel({
			userId: req.userId,
			challengeId,
			day,
			note,
			completed,
		});

		const saved = await log.save();
		sendResponse(res, 201, saved);
	} catch (error) {
		sendResponse(res, 400, getErrorMessage(error), false);
	}
});

// GET /logs/:challengeId
router.get(
	"/:challengeId",
	async (req: AuthRequest, res: Response): Promise<void> => {
		try {
			const { challengeId } = req.params;

			if (!isValidObjectId(challengeId)) {
				sendResponse(res, 400, "Invalid challenge ID", false);
				return;
			}

			const logs = await LogModel.find({
				challengeId,
				userId: req.userId,
			}).sort({ day: 1 });

			sendResponse(res, 200, logs);
		} catch (error) {
			sendResponse(res, 500, getErrorMessage(error), false);
		}
	},
);

// PUT /logs/:id
router.put("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			sendResponse(res, 400, "Invalid ID format", false);
			return;
		}

		const { note, completed } = req.body;

		const updated = await LogModel.findOneAndUpdate(
			{ _id: id, userId: req.userId },
			{ note, completed },
			{ new: true, runValidators: true },
		);

		if (!updated) {
			sendResponse(res, 404, "Log not found", false);
			return;
		}

		sendResponse(res, 200, updated);
	} catch (error) {
		sendResponse(res, 400, getErrorMessage(error), false);
	}
});

export default router;
