import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	getChallenge,
	createLog,
	deleteChallenge,
} from "@/services/challengeService";
import type { Challenge, Log } from "@/types";
import Navbar from "@/components/layout/Navbar";
import HeatMap from "@/components/HeatMap";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import {
	ArrowLeft,
	Flame,
	CheckCircle,
	Trash2,
	Globe,
	Lock,
} from "lucide-react";

const ChallengePage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [logs, setLogs] = useState<Log[]>([]);
	const [loading, setLoading] = useState(true);
	const [logNote, setLogNote] = useState("");
	const [logging, setLogging] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const completedDays = logs.filter((l) => l.completed).length;
	const nextDay = completedDays + 1;
	const progress = challenge
		? Math.round((completedDays / challenge.totalDays) * 100)
		: 0;

	const calculateStreak = () => {
		if (logs.length === 0) return 0;
		const sorted = [...logs]
			.filter((l) => l.completed)
			.map((l) => l.day)
			.sort((a, b) => b - a);
		let streak = 1;
		for (let i = 0; i < sorted.length - 1; i++) {
			if (sorted[i] - sorted[i + 1] === 1) streak++;
			else break;
		}
		return streak;
	};

	useEffect(() => {
		if (!id) return;
		const fetch = async () => {
			try {
				const data = await getChallenge(id);
				setChallenge(data.challenge);
				setLogs(data.logs);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load");
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [id]);

	const handleLog = async () => {
		if (!id || !challenge) return;
		setLogging(true);
		try {
			const newLog = await createLog({
				challengeId: id,
				day: nextDay,
				note: logNote,
				completed: true,
			});
			setLogs((prev) => [...prev, newLog]);
			setLogNote("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to log day");
		} finally {
			setLogging(false);
		}
	};

	const handleDelete = async () => {
		if (!id || !confirm("Delete this challenge?")) return;
		await deleteChallenge(id);
		navigate("/dashboard");
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-[#080808] flex items-center justify-center'>
				<Spinner className='w-8 h-8' />
			</div>
		);
	}

	if (!challenge) return null;

	const alreadyLoggedToday = logs.some((l) => l.day === nextDay);
	const isComplete = completedDays >= challenge.totalDays;

	return (
		<div className='min-h-screen bg-[#080808]'>
			<Navbar />
			<main className='max-w-4xl mx-auto px-6 py-12'>
				<button
					onClick={() => navigate("/dashboard")}
					className='flex items-center gap-2 text-white/30 hover:text-white/60 text-sm mb-8 transition-colors'>
					<ArrowLeft className='w-4 h-4' />
					Back to dashboard
				</button>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-10'>
					<div className='flex items-start justify-between'>
						<div>
							<div className='flex items-center gap-3 mb-3'>
								<Badge variant={challenge.isPublic ? "success" : "muted"}>
									{challenge.isPublic ? (
										<>
											<Globe className='w-3 h-3 mr-1' />
											Public
										</>
									) : (
										<>
											<Lock className='w-3 h-3 mr-1' />
											Private
										</>
									)}
								</Badge>
							</div>
							<h1
								className='text-4xl font-bold tracking-tight mb-2'
								style={{ fontFamily: "Syne, sans-serif" }}>
								{challenge.title}
							</h1>
							{challenge.description && (
								<p className='text-white/40'>{challenge.description}</p>
							)}
						</div>
						<button
							onClick={handleDelete}
							className='text-white/20 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg'>
							<Trash2 className='w-5 h-5' />
						</button>
					</div>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='grid grid-cols-3 gap-4 mb-8'>
					{[
						{
							label: "Current Streak",
							value: `${calculateStreak()} days`,
							icon: Flame,
							color: "text-orange-400",
						},
						{
							label: "Completed",
							value: `${completedDays}/${challenge.totalDays}`,
							icon: CheckCircle,
							color: "text-green-400",
						},
						{
							label: "Progress",
							value: `${progress}%`,
							icon: null,
							color: "text-blue-400",
						},
					].map((stat, i) => (
						<div
							key={i}
							className='bg-[#111111] border border-white/5 rounded-2xl p-5'>
							<p className='text-white/40 text-xs mb-2'>{stat.label}</p>
							<p
								className={`text-2xl font-bold ${stat.color}`}
								style={{ fontFamily: "Syne, sans-serif" }}>
								{stat.value}
							</p>
						</div>
					))}
				</motion.div>

				{/* Progress bar */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className='bg-[#111111] border border-white/5 rounded-2xl p-6 mb-8'>
					<div className='flex justify-between text-sm text-white/40 mb-3'>
						<span>Progress</span>
						<span>{progress}%</span>
					</div>
					<div className='h-2 bg-white/5 rounded-full overflow-hidden'>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
							className='h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full'
						/>
					</div>
				</motion.div>

				{/* Heatmap */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='bg-[#111111] border border-white/5 rounded-2xl p-6 mb-8'>
					<h2
						className='text-lg font-semibold mb-6'
						style={{ fontFamily: "Syne, sans-serif" }}>
						Progress Map
					</h2>
					<HeatMap logs={logs} totalDays={challenge.totalDays} />
				</motion.div>

				{/* Log today */}
				{!isComplete && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className='bg-[#111111] border border-white/5 rounded-2xl p-6 mb-8'>
						<h2
							className='text-lg font-semibold mb-4'
							style={{ fontFamily: "Syne, sans-serif" }}>
							{alreadyLoggedToday
								? `Day ${nextDay} logged ✓`
								: `Log Day ${nextDay}`}
						</h2>

						{!alreadyLoggedToday ? (
							<>
								<textarea
									placeholder='What did you work on today?'
									value={logNote}
									onChange={(e) => setLogNote(e.target.value)}
									rows={3}
									className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-all text-sm resize-none mb-4'
								/>
								{error && <p className='text-red-400 text-sm mb-4'>{error}</p>}
								<button
									onClick={handleLog}
									disabled={logging}
									className='flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors'>
									{logging ? (
										<Spinner className='w-4 h-4' />
									) : (
										<>
											<Flame className='w-4 h-4' />
											Log Today
										</>
									)}
								</button>
							</>
						) : (
							<p className='text-green-400 text-sm flex items-center gap-2'>
								<CheckCircle className='w-4 h-4' />
								You already logged today. See you tomorrow 🔥
							</p>
						)}
					</motion.div>
				)}

				{/* Log history */}
				{logs.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className='bg-[#111111] border border-white/5 rounded-2xl p-6'>
						<h2
							className='text-lg font-semibold mb-6'
							style={{ fontFamily: "Syne, sans-serif" }}>
							Log History
						</h2>
						<div className='space-y-3 max-h-96 overflow-y-auto pr-2'>
							{[...logs].reverse().map((log) => (
								<div
									key={log._id}
									className='flex gap-4 p-4 bg-white/3 rounded-xl border border-white/5'>
									<div className='w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 text-xs font-bold flex-shrink-0'>
										{log.day}
									</div>
									<div>
										<p className='text-white/60 text-sm'>
											{log.note || "No note for this day."}
										</p>
										<p className='text-white/20 text-xs mt-1'>
											{new Date(log.createdAt).toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</main>
		</div>
	);
};

export default ChallengePage;
