import { motion } from "framer-motion";
import type { Log } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
	logs: Log[];
	totalDays: number;
}

const HeatMap = ({ logs, totalDays }: Props) => {
	const completedSet = new Set(
		logs.filter((l) => l.completed).map((l) => l.day),
	);

	return (
		<div className='flex flex-wrap gap-1.5'>
			{Array.from({ length: totalDays }, (_, i) => {
				const day = i + 1;
				const isDone = completedSet.has(day);
				return (
					<motion.div
						key={day}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: i * 0.01 }}
						title={`Day ${day}${isDone ? " ✓" : ""}`}
						className={cn(
							"w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-medium transition-colors cursor-default",
							isDone
								? "bg-orange-500 text-white"
								: "bg-white/5 text-white/20 hover:bg-white/10",
						)}>
						{day}
					</motion.div>
				);
			})}
		</div>
	);
};

export default HeatMap;
