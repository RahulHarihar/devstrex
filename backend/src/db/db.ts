import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
	try {
		const uri: string | undefined = process.env.MONGO_URI;
		if (!uri) {
			console.error("MONGO_URI is not defined");
			process.exit(1);
		}
		await mongoose.connect(uri);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};

export default connectDB;
