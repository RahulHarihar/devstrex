import mongoose, { Schema, Document } from "mongoose";

export interface ITask {
	day: number;
	title: string;
}

export interface IChallenge extends Document {
	userId: mongoose.Types.ObjectId;
	title: string;
	description: string;
	totalDays: number;
	startDate: Date;
	tasks: ITask[];
	isPublic: boolean;
}

const TaskSchema = new Schema({
	day: { type: Number, required: true },
	title: { type: String, required: true, trim: true },
});

const ChallengeSchema: Schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxlength: [100, "Title cannot exceed 100 characters"],
		},
		description: {
			type: String,
			default: "",
			trim: true,
			maxlength: [500, "Description cannot exceed 500 characters"],
		},
		totalDays: {
			type: Number,
			required: [true, "Total days is required"],
			min: [1, "Challenge must be at least 1 day"],
			max: [365, "Challenge cannot exceed 365 days"],
		},
		startDate: {
			type: Date,
			default: Date.now,
		},
		tasks: [TaskSchema],
		isPublic: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

export const ChallengeModel = mongoose.model<IChallenge>(
	"Challenge",
	ChallengeSchema,
);
