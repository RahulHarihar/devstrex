import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
	userId: mongoose.Types.ObjectId;
	challengeId: mongoose.Types.ObjectId;
	day: number;
	note: string;
	completed: boolean;
}

const LogSchema: Schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		challengeId: {
			type: Schema.Types.ObjectId,
			ref: "Challenge",
			required: true,
		},
		day: {
			type: Number,
			required: [true, "Day number is required"],
			min: [1, "Day must be at least 1"],
		},
		note: {
			type: String,
			default: "",
			trim: true,
			maxlength: [1000, "Note cannot exceed 1000 characters"],
		},
		completed: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

// Prevent duplicate logs for same day in same challenge
LogSchema.index({ challengeId: 1, day: 1 }, { unique: true });

export const LogModel = mongoose.model<ILog>("Log", LogSchema);
