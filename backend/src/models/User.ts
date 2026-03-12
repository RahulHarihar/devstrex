import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	email: string;
	password: string;
	username: string;
}

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			lowercase: true,
			trim: true,
			minlength: [3, "Username must be at least 3 characters"],
			maxlength: [20, "Username cannot exceed 20 characters"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"],
		},
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
