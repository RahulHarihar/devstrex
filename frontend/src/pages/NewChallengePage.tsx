import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createChallenge } from "@/services/challengeService";
import Navbar from "@/components/layout/Navbar";
import { Spinner } from "@/components/ui/Spinner";
import { ArrowLeft } from "lucide-react";

const NewChallengePage = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [totalDays, setTotalDays] = useState(30);
	const [isPublic, setIsPublic] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!title.trim()) return;
		setLoading(true);
		setError(null);
		try {
			const challenge = await createChallenge({
				title,
				description,
				totalDays,
				isPublic,
				tasks: Array.from({ length: totalDays }, (_, i) => ({
					day: i + 1,
					title: `Day ${i + 1}`,
				})),
			});
			navigate(`/challenges/${challenge._id}`);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to create challenge",
			);
		} finally {
			setLoading(false);
		}
	};

	const inputClass =
		"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-all text-sm";

	return (
		<div className='min-h-screen bg-[#080808]'>
			<Navbar />
			<main className='max-w-2xl mx-auto px-6 py-12'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}>
					<button
						onClick={() => navigate("/dashboard")}
						className='flex items-center gap-2 text-white/30 hover:text-white/60 text-sm mb-8 transition-colors'>
						<ArrowLeft className='w-4 h-4' />
						Back to dashboard
					</button>

					<h1
						className='text-3xl font-bold tracking-tight mb-8'
						style={{ fontFamily: "Syne, sans-serif" }}>
						New Challenge
					</h1>

					<div className='bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6'>
						<div>
							<label className='text-sm text-white/50 mb-2 block'>Title</label>
							<input
								type='text'
								placeholder='30 Days of MERN...'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className={inputClass}
							/>
						</div>

						<div>
							<label className='text-sm text-white/50 mb-2 block'>
								Description
							</label>
							<textarea
								placeholder='What are you building or learning?'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={3}
								className={`${inputClass} resize-none`}
							/>
						</div>

						<div>
							<label className='text-sm text-white/50 mb-2 block'>
								Total Days
							</label>
							<div className='flex items-center gap-4'>
								{[7, 14, 30, 60, 100].map((d) => (
									<button
										key={d}
										onClick={() => setTotalDays(d)}
										className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
											totalDays === d
												? "bg-orange-500 text-white"
												: "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
										}`}>
										{d}
									</button>
								))}
							</div>
						</div>

						<div className='flex items-center justify-between py-4 border-t border-white/5'>
							<div>
								<p className='text-sm font-medium text-white/80'>
									Public Profile
								</p>
								<p className='text-xs text-white/30 mt-0.5'>
									Share your progress with a public link
								</p>
							</div>
							<button
								onClick={() => setIsPublic(!isPublic)}
								className={`w-12 h-6 rounded-full transition-colors relative ${
									isPublic ? "bg-orange-500" : "bg-white/10"
								}`}>
								<div
									className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
										isPublic ? "translate-x-7" : "translate-x-1"
									}`}
								/>
							</button>
						</div>

						{error && <p className='text-red-400 text-sm'>{error}</p>}

						<button
							onClick={handleSubmit}
							disabled={loading || !title.trim()}
							className='w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2'>
							{loading ? <Spinner className='w-4 h-4' /> : "Start Challenge"}
						</button>
					</div>
				</motion.div>
			</main>
		</div>
	);
};

export default NewChallengePage;
