import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "./models/User";
import { ChallengeModel } from "./models/Challenge";
import { LogModel } from "./models/Log";

const seed = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
		console.log("MongoDB connected");

		// Clear existing data
		await UserModel.deleteMany({});
		await ChallengeModel.deleteMany({});
		await LogModel.deleteMany({});
		console.log("Cleared existing data");

		// --- USERS ---
		const hashedPassword = await bcrypt.hash("password123", 10);

		const users = await UserModel.insertMany([
			{
				email: "alex@devstreak.io",
				username: "alex",
				password: hashedPassword,
			},
			{
				email: "sara@devstreak.io",
				username: "sara",
				password: hashedPassword,
			},
			{
				email: "john@devstreak.io",
				username: "john",
				password: hashedPassword,
			},
		]);

		console.log(`Seeded ${users.length} users`);

		// --- CHALLENGES ---
		const challenges = await ChallengeModel.insertMany([
			{
				userId: users[0]._id,
				title: "30 Days of MERN",
				description:
					"Building a full stack MERN application from scratch in 30 days. Covering Node, Express, MongoDB and React.",
				totalDays: 30,
				startDate: new Date("2025-01-01"),
				isPublic: true,
				tasks: Array.from({ length: 30 }, (_, i) => ({
					day: i + 1,
					title: `Day ${i + 1} task`,
				})),
			},
			{
				userId: users[0]._id,
				title: "100 Days of DSA",
				description:
					"Solving one data structures and algorithms problem every day for 100 days.",
				totalDays: 100,
				startDate: new Date("2025-02-01"),
				isPublic: true,
				tasks: Array.from({ length: 100 }, (_, i) => ({
					day: i + 1,
					title: `Problem ${i + 1}`,
				})),
			},
			{
				userId: users[1]._id,
				title: "60 Days of System Design",
				description:
					"Learning system design concepts and practicing design interviews for 60 days.",
				totalDays: 60,
				startDate: new Date("2025-01-15"),
				isPublic: true,
				tasks: Array.from({ length: 60 }, (_, i) => ({
					day: i + 1,
					title: `System Design Topic ${i + 1}`,
				})),
			},
			{
				userId: users[2]._id,
				title: "30 Days of TypeScript",
				description:
					"Deep diving into TypeScript from basics to advanced patterns.",
				totalDays: 30,
				startDate: new Date("2025-03-01"),
				isPublic: false,
				tasks: Array.from({ length: 30 }, (_, i) => ({
					day: i + 1,
					title: `TypeScript Concept ${i + 1}`,
				})),
			},
		]);

		console.log(`Seeded ${challenges.length} challenges`);

		// --- LOGS ---
		// Alex - 30 Days of MERN (27 days logged, active streak)
		const alexMernLogs = Array.from({ length: 27 }, (_, i) => ({
			userId: users[0]._id,
			challengeId: challenges[0]._id,
			day: i + 1,
			completed: true,
			note: [
				"Set up Express server with TypeScript. Clean folder structure from the start.",
				"Built first REST API. GET and POST working perfectly.",
				"Connected MongoDB with Mongoose. First real database connection.",
				"Designed schemas with validation. Enums and required fields.",
				"Full CRUD with MongoDB. Ran into req.body injection issue — fixed it.",
				"Connected React frontend to Express. CORS was the first wall I hit.",
				"JWT auth working end to end. bcrypt hashing feels like magic.",
				"Protected routes with middleware. One function guarding everything.",
				"Built the dashboard UI with Tailwind. Clean and responsive.",
				"Added loading and error states everywhere. UX matters.",
				"Learned about compound indexes in MongoDB today.",
				"Refactored the service layer. All fetch calls in one place now.",
				"TypeScript strict mode caught 3 bugs before runtime.",
				"Built the public profile page. No auth needed to view.",
				"Streak calculation logic was trickier than expected.",
				"Added form validation on the frontend. Never trust user input.",
				"Cleaned up error messages. They should tell you what went wrong.",
				"Postman collection fully documented. Future me will thank me.",
				"Reviewed my own code before committing. Found 2 issues.",
				"import * as jwt — learned the hard way about CommonJS exports.",
				"Seeded the database with dummy data. Testing is so much easier now.",
				"Environment variables locked down. Nothing hardcoded.",
				"Middleware chain is clean. Auth → validate → handle.",
				"Reviewed Day 1 code vs today. The difference is wild.",
				"Added timestamps to every model. createdAt and updatedAt for free.",
				"Consistent response shape across every single route.",
				"Building the thing I wished existed on Day 1.",
			][i],
		}));

		// Alex - 100 Days of DSA (15 days logged)
		const alexDsaLogs = Array.from({ length: 15 }, (_, i) => ({
			userId: users[0]._id,
			challengeId: challenges[1]._id,
			day: i + 1,
			completed: true,
			note: `Solved problem ${i + 1}. Time complexity: O(n log n).`,
		}));

		// Sara - 60 Days of System Design (20 days logged)
		const saraLogs = Array.from({ length: 20 }, (_, i) => ({
			userId: users[1]._id,
			challengeId: challenges[2]._id,
			day: i + 1,
			completed: i !== 7 && i !== 14, // missed day 8 and 15
			note: `Studied ${
				[
					"Load Balancing",
					"Caching strategies",
					"Database sharding",
					"CAP theorem",
					"Rate limiting",
					"CDN architecture",
					"Message queues",
					"Skipped today",
					"Microservices",
					"API Gateway patterns",
					"Event driven architecture",
					"Database replication",
					"Consistent hashing",
					"Distributed transactions",
					"Skipped today",
					"Service discovery",
					"Circuit breaker pattern",
					"CQRS pattern",
					"Event sourcing",
					"Saga pattern",
				][i]
			}.`,
		}));

		// John - 30 Days of TypeScript (10 days logged, private challenge)
		const johnLogs = Array.from({ length: 10 }, (_, i) => ({
			userId: users[2]._id,
			challengeId: challenges[3]._id,
			day: i + 1,
			completed: true,
			note: `Covered TypeScript concept ${i + 1} today.`,
		}));

		const allLogs = [...alexMernLogs, ...alexDsaLogs, ...saraLogs, ...johnLogs];

		await LogModel.insertMany(allLogs);
		console.log(`Seeded ${allLogs.length} logs`);

		// --- SUMMARY ---
		console.log("\n🌱 Seed complete. Here's what's in the database:\n");
		console.log("USERS:");
		users.forEach((u) =>
			console.log(`  → ${u.username} (${u.email}) | password: password123`),
		);
		console.log("\nCHALLENGES:");
		challenges.forEach((c) =>
			console.log(
				`  → "${c.title}" by userId ${c.userId} | public: ${c.isPublic}`,
			),
		);
		console.log(`\nLOGS: ${allLogs.length} total\n`);

		await mongoose.disconnect();
		console.log("MongoDB disconnected");
		process.exit(0);
	} catch (error) {
		console.error("Seed error:", error);
		process.exit(1);
	}
};

seed();
