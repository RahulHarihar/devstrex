import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getChallenges } from "@/services/challengeService";
import { getUsername } from "@/services/authService";
import type { Challenge, Log } from "@/types";
import Navbar from "@/components/layout/Navbar";
import ChallengeCard from "@/components/ChallengeCard";
import { Spinner } from "@/components/ui/Spinner";
import { Plus, Trophy } from "lucide-react";

const DashboardPage = () => {
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const username = getUsername();

	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await getChallenges();
				setChallenges(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load challenges",
				);
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, []);

	return (
		<div className='min-h-screen bg-[#080808]'>
			<Navbar />
			<main className='max-w-6xl mx-auto px-6 py-12'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-12'>
					<p className='text-orange-400 text-sm font-medium mb-2'>
						Welcome back, {username}
					</p>
					<h1
						className='text-4xl font-bold tracking-tight'
						style={{ fontFamily: "Syne, sans-serif" }}>
						Your Challenges
					</h1>
				</motion.div>

				{loading && (
					<div className='flex justify-center py-20'>
						<Spinner className='w-8 h-8' />
					</div>
				)}

				{error && (
					<div className='bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm'>
						{error}
					</div>
				)}

				{!loading && !error && challenges.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col items-center justify-center py-32 text-center'>
						<div className='w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6'>
							<Trophy className='w-8 h-8 text-white/20' />
						</div>
						<h3
							className='text-xl font-semibold text-white/60 mb-2'
							style={{ fontFamily: "Syne, sans-serif" }}>
							No challenges yet
						</h3>
						<p className='text-white/30 text-sm mb-8'>
							Create your first challenge and start your streak
						</p>
						<button
							onClick={() => navigate("/challenges/new")}
							className='flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-xl transition-colors'>
							<Plus className='w-4 h-4' />
							Create Challenge
						</button>
					</motion.div>
				)}

				{!loading && challenges.length > 0 && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{challenges.map((challenge, i) => (
							<ChallengeCard
								key={challenge._id}
								challenge={challenge}
								logs={[]}
								index={i}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
