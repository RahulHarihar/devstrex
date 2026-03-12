import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Challenge, Log } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Flame, Calendar, Globe, Lock } from "lucide-react";

interface Props {
	challenge: Challenge;
	logs: Log[];
	index: number;
}

const ChallengeCard = ({ challenge, logs, index }: Props) => {
	const navigate = useNavigate();
	const completedDays = logs.filter((l) => l.completed).length;
	const progress = Math.round((completedDays / challenge.totalDays) * 100);

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

	const streak = calculateStreak();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.08 }}
			onClick={() => navigate(`/challenges/${challenge._id}`)}
			className='group bg-[#111111] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-orange-500/30 hover:bg-[#141414] transition-all duration-300'>
			<div className='flex items-start justify-between mb-4'>
				<div className='flex-1 min-w-0'>
					<h3
						className='text-lg font-semibold text-white truncate group-hover:text-orange-400 transition-colors'
						style={{ fontFamily: "Syne, sans-serif" }}>
						{challenge.title}
					</h3>
					<p className='text-white/40 text-sm mt-1 line-clamp-2'>
						{challenge.description || "No description"}
					</p>
				</div>
				<div className='ml-4 flex flex-col items-end gap-2'>
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
			</div>

			<div className='mb-4'>
				<div className='flex justify-between text-xs text-white/40 mb-2'>
					<span>
						{completedDays} of {challenge.totalDays} days
					</span>
					<span>{progress}%</span>
				</div>
				<div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{
							delay: index * 0.08 + 0.3,
							duration: 0.8,
							ease: "easeOut",
						}}
						className='h-full bg-orange-500 rounded-full'
					/>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-1.5 text-orange-400'>
					<Flame className='w-4 h-4' />
					<span className='text-sm font-semibold'>{streak} day streak</span>
				</div>
				<div className='flex items-center gap-1.5 text-white/30 text-xs'>
					<Calendar className='w-3 h-3' />
					<span>Day {challenge.totalDays}</span>
				</div>
			</div>
		</motion.div>
	);
};

export default ChallengeCard;
