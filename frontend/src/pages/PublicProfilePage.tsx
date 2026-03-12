import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getPublicProfile } from "@/services/challengeService";
import type { PublicProfile, PublicChallenge } from "@/types";
import HeatMap from "@/components/HeatMap";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { Flame, Trophy, ArrowLeft } from "lucide-react";

const PublicProfilePage = () => {
	const { username } = useParams<{ username: string }>();
	const navigate = useNavigate();
	const [profile, setProfile] = useState<PublicProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!username) return;
		const fetch = async () => {
			try {
				const data = await getPublicProfile(username);
				setProfile(data);
			} catch {
				setError("Profile not found");
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [username]);

	if (loading) {
		return (
			<div className='min-h-screen bg-[#080808] flex items-center justify-center'>
				<Spinner className='w-8 h-8' />
			</div>
		);
	}

	if (error || !profile) {
		return (
			<div className='min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4'>
				<p className='text-white/40'>{error || "Profile not found"}</p>
				<button
					onClick={() => navigate("/auth")}
					className='text-orange-400 text-sm hover:underline'>
					Go to DevStreak
				</button>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-[#080808]'>
			{/* Header */}
			<div className='border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl sticky top-0 z-50'>
				<div className='max-w-4xl mx-auto px-6 h-16 flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center'>
							<Flame className='w-3.5 h-3.5 text-white' />
						</div>
						<span
							className='text-base font-bold'
							style={{ fontFamily: "Syne, sans-serif" }}>
							devstreak
						</span>
					</div>
					<button
						onClick={() => navigate("/auth")}
						className='text-sm text-white/30 hover:text-white/60 transition-colors'>
						Start your streak →
					</button>
				</div>
			</div>

			<main className='max-w-4xl mx-auto px-6 py-12'>
				{/* Profile header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-12'>
					<div className='flex items-center gap-4 mb-2'>
						<div className='w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center'>
							<span
								className='text-2xl font-bold text-orange-400'
								style={{ fontFamily: "Syne, sans-serif" }}>
								{username?.[0].toUpperCase()}
							</span>
						</div>
						<div>
							<h1
								className='text-3xl font-bold tracking-tight'
								style={{ fontFamily: "Syne, sans-serif" }}>
								{username}
							</h1>
							<p className='text-white/30 text-sm'>
								{profile.challenges.length} public challenge
								{profile.challenges.length !== 1 ? "s" : ""}
							</p>
						</div>
					</div>
				</motion.div>

				{/* Challenges */}
				{profile.challenges.length === 0 ? (
					<div className='flex flex-col items-center py-20 text-center'>
						<Trophy className='w-10 h-10 text-white/10 mb-4' />
						<p className='text-white/30'>No public challenges yet</p>
					</div>
				) : (
					<div className='space-y-6'>
						{profile.challenges.map((item: PublicChallenge, i: number) => {
							const progress = Math.round(
								(item.completedDays / item.challenge.totalDays) * 100,
							);
							return (
								<motion.div
									key={item.challenge._id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className='bg-[#111111] border border-white/5 rounded-2xl p-8'>
									<div className='flex items-start justify-between mb-6'>
										<div>
											<h2
												className='text-2xl font-bold mb-1'
												style={{ fontFamily: "Syne, sans-serif" }}>
												{item.challenge.title}
											</h2>
											{item.challenge.description && (
												<p className='text-white/40 text-sm'>
													{item.challenge.description}
												</p>
											)}
										</div>
										<div className='flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-xl'>
											<Flame className='w-4 h-4 text-orange-400' />
											<span className='text-orange-400 font-bold text-sm'>
												{item.streak}
											</span>
										</div>
									</div>

									<div className='grid grid-cols-3 gap-4 mb-6'>
										{[
											{ label: "Streak", value: `${item.streak} days` },
											{
												label: "Completed",
												value: `${item.completedDays}/${item.challenge.totalDays}`,
											},
											{ label: "Progress", value: `${progress}%` },
										].map((s, j) => (
											<div key={j} className='bg-white/3 rounded-xl p-4'>
												<p className='text-white/30 text-xs mb-1'>{s.label}</p>
												<p
													className='text-white font-bold'
													style={{ fontFamily: "Syne, sans-serif" }}>
													{s.value}
												</p>
											</div>
										))}
									</div>

									<div className='mb-6'>
										<div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${progress}%` }}
												transition={{ delay: i * 0.1 + 0.4, duration: 0.8 }}
												className='h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full'
											/>
										</div>
									</div>

									<HeatMap
										logs={item.logs}
										totalDays={item.challenge.totalDays}
									/>

									{/* Recent logs */}
									{item.logs.length > 0 && (
										<div className='mt-6 pt-6 border-t border-white/5'>
											<p className='text-white/30 text-xs mb-3'>Recent logs</p>
											<div className='space-y-2'>
												{[...item.logs]
													.reverse()
													.slice(0, 3)
													.map((log) => (
														<div
															key={log._id}
															className='flex gap-3 items-start'>
															<span className='text-orange-400/60 text-xs font-mono w-10 shrink-0 mt-0.5'>
																D{log.day}
															</span>
															<p className='text-white/40 text-xs line-clamp-1'>
																{log.note || "No note"}
															</p>
														</div>
													))}
											</div>
										</div>
									)}
								</motion.div>
							);
						})}
					</div>
				)}
			</main>
		</div>
	);
};

export default PublicProfilePage;
