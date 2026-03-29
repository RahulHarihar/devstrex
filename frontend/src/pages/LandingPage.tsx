import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
	Flame,
	BarChart2,
	Globe,
	CheckCircle,
	ArrowRight,
	Github,
	Twitter,
} from "lucide-react";

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.6, ease: [0.42, 0, 0.58, 1] },
	}),
};

const FEATURES = [
	{
		icon: Flame,
		title: "Streak Tracking",
		desc: "Never lose count. Your current streak is calculated automatically every time you log a day.",
	},
	{
		icon: BarChart2,
		title: "Progress Heatmap",
		desc: "Every completed day lights up. See your consistency at a glance — no hiding from the gaps.",
	},
	{
		icon: Globe,
		title: "Public Profile",
		desc: "One shareable link. Your challenge, your logs, your streak — visible to anyone without a login.",
	},
	{
		icon: CheckCircle,
		title: "Daily Logging",
		desc: "Write a note for each day. What you built, what you learned, what broke. Your journey documented.",
	},
];

const STEPS = [
	{
		number: "01",
		title: "Create a challenge",
		desc: "Name it, set the duration, define your daily tasks.",
	},
	{
		number: "02",
		title: "Log every day",
		desc: "Check in daily with a note. Keep the streak alive.",
	},
	{
		number: "03",
		title: "Share your profile",
		desc: "One link. Your entire journey visible to anyone.",
	},
];

const FOR_WHO = [
	"Developers doing #100DaysOfCode",
	"Bootcamp students tracking their own curriculum",
	"Self-taught developers who want accountability",
	"Anyone running a 30, 60, or 100 day challenge",
];

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div
			className='min-h-screen bg-[#080808] text-white overflow-x-hidden'
			style={{ fontFamily: "DM Sans, sans-serif" }}>
			{/* Ambient background */}
			<div className='fixed inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]' />
				<div className='absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-[100px]' />
			</div>

			{/* Navbar */}
			<nav className='relative z-10 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl sticky top-0'>
				<div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center'>
							<Flame className='w-4 h-4 text-white' />
						</div>
						<span
							className='text-lg font-bold tracking-tight'
							style={{ fontFamily: "Syne, sans-serif" }}>
							devstrex
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => navigate("/auth")}
							className='text-white/50 hover:text-white text-sm transition-colors px-4 py-2'>
							Login
						</button>
						<button
							onClick={() => navigate("/auth")}
							className='bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors'>
							Get Started
						</button>
					</div>
				</div>
			</nav>

			{/* Hero */}
			<section className='relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 text-center'>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={0}
					className='inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-orange-400 text-sm font-medium mb-8'>
					<Flame className='w-3.5 h-3.5' />
					Built by a developer. For developers.
				</motion.div>

				<motion.h1
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={1}
					className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6'
					style={{ fontFamily: "Syne, sans-serif" }}>
					Your dev challenge.
					<br />
					<span className='text-orange-500'>Tracked. Logged. Shared.</span>
				</motion.h1>

				<motion.p
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={2}
					className='text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'>
					DevStrex gives structure to any coding challenge you run. Create it.
					Log every day. Share your public streak profile with one link.
				</motion.p>

				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={3}
					className='flex flex-col sm:flex-row items-center justify-center gap-4'>
					<button
						onClick={() => navigate("/auth")}
						className='flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base group'>
						Start your streak
						<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</button>
					<button
						onClick={() =>
							window.open("https://devstrex.vercel.app/alex", "_blank")
						}
						className='flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium px-8 py-4 rounded-xl transition-all text-base'>
						<Globe className='w-4 h-4' />
						See a live profile
					</button>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={4}
					className='flex items-center justify-center gap-8 mt-16'>
					{[
						{ value: "30", label: "Days to build this" },
						{ value: "∞", label: "Challenges supported" },
						{ value: "1", label: "Link to share it all" },
					].map((s, i) => (
						<div key={i} className='text-center'>
							<p
								className='text-3xl font-bold text-orange-400'
								style={{ fontFamily: "Syne, sans-serif" }}>
								{s.value}
							</p>
							<p className='text-white/30 text-xs mt-1'>{s.label}</p>
						</div>
					))}
				</motion.div>
			</section>

			{/* Why section */}
			<section className='relative z-10 border-y border-white/5 bg-white/[0.02]'>
				<div className='max-w-6xl mx-auto px-6 py-24'>
					<div className='grid md:grid-cols-2 gap-16 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}>
							<p className='text-orange-400 text-sm font-medium mb-4'>
								Why DevStrex exists
							</p>
							<h2
								className='text-4xl font-bold tracking-tight mb-6 leading-tight'
								style={{ fontFamily: "Syne, sans-serif" }}>
								The hashtag existed.
								<br />
								The tool didn't.
							</h2>
							<p className='text-white/50 leading-relaxed mb-6'>
								#100DaysOfCode has millions of developers. But the
								accountability lives in a hashtag — not a structured tool. No
								daily log. No streak counter. No shareable progress page.
							</p>
							<p className='text-white/50 leading-relaxed'>
								DevStrex was built during a 30-day MERN challenge to track that
								same challenge. The meta problem solved itself.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='bg-[#111111] border border-white/5 rounded-2xl p-8'>
							<p className='text-white/30 text-xs mb-6 uppercase tracking-widest'>
								Before DevStrex
							</p>
							{[
								"Tweeting day numbers with no structure",
								"No record of what you actually did each day",
								"Streak broken — no way to visualise it",
								"No single link to share your progress",
							].map((item, i) => (
								<div key={i} className='flex items-start gap-3 mb-4'>
									<div className='w-4 h-4 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mt-0.5 shrink-0'>
										<div className='w-1.5 h-1.5 bg-red-400 rounded-full' />
									</div>
									<p className='text-white/40 text-sm'>{item}</p>
								</div>
							))}

							<p className='text-white/30 text-xs mb-6 uppercase tracking-widest mt-8'>
								After DevStrex
							</p>
							{[
								"Structured challenge with daily tasks",
								"Every day logged with a personal note",
								"Heatmap showing your streak visually",
								"One public link anyone can visit",
							].map((item, i) => (
								<div key={i} className='flex items-start gap-3 mb-4'>
									<div className='w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-0.5 shrink-0'>
										<div className='w-1.5 h-1.5 bg-green-400 rounded-full' />
									</div>
									<p className='text-white/60 text-sm'>{item}</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className='relative z-10 max-w-6xl mx-auto px-6 py-24'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-16'>
					<p className='text-orange-400 text-sm font-medium mb-4'>Features</p>
					<h2
						className='text-4xl font-bold tracking-tight'
						style={{ fontFamily: "Syne, sans-serif" }}>
						Everything a challenge needs.
						<br />
						Nothing it doesn't.
					</h2>
				</motion.div>

				<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{FEATURES.map((f, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className='bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-orange-500/20 transition-colors'>
							<div className='w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4'>
								<f.icon className='w-5 h-5 text-orange-400' />
							</div>
							<h3
								className='text-base font-semibold mb-2'
								style={{ fontFamily: "Syne, sans-serif" }}>
								{f.title}
							</h3>
							<p className='text-white/40 text-sm leading-relaxed'>{f.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* How it works */}
			<section className='relative z-10 border-y border-white/5 bg-white/[0.02]'>
				<div className='max-w-6xl mx-auto px-6 py-24'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-16'>
						<p className='text-orange-400 text-sm font-medium mb-4'>
							How it works
						</p>
						<h2
							className='text-4xl font-bold tracking-tight'
							style={{ fontFamily: "Syne, sans-serif" }}>
							Three steps. That's it.
						</h2>
					</motion.div>

					<div className='grid md:grid-cols-3 gap-6'>
						{STEPS.map((step, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.15 }}
								className='relative'>
								<div className='bg-[#111111] border border-white/5 rounded-2xl p-8'>
									<span
										className='text-5xl font-bold text-orange-500/20 block mb-4'
										style={{ fontFamily: "Syne, sans-serif" }}>
										{step.number}
									</span>
									<h3
										className='text-xl font-semibold mb-3'
										style={{ fontFamily: "Syne, sans-serif" }}>
										{step.title}
									</h3>
									<p className='text-white/40 text-sm leading-relaxed'>
										{step.desc}
									</p>
								</div>
								{i < STEPS.length - 1 && (
									<div className='hidden md:block absolute top-1/2 -right-3 z-10'>
										<ArrowRight className='w-5 h-5 text-white/10' />
									</div>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Who it's for */}
			<section className='relative z-10 max-w-6xl mx-auto px-6 py-24'>
				<div className='grid md:grid-cols-2 gap-16 items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}>
						<p className='text-orange-400 text-sm font-medium mb-4'>
							Who it's for
						</p>
						<h2
							className='text-4xl font-bold tracking-tight mb-8 leading-tight'
							style={{ fontFamily: "Syne, sans-serif" }}>
							Built for developers
							<br />
							who show up daily.
						</h2>
						<div className='space-y-4'>
							{FOR_WHO.map((item, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className='flex items-center gap-3'>
									<div className='w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0' />
									<p className='text-white/60 text-sm'>{item}</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='bg-[#111111] border border-white/5 rounded-2xl p-8'>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center'>
								<span
									className='text-orange-400 font-bold text-sm'
									style={{ fontFamily: "Syne, sans-serif" }}>
									A
								</span>
							</div>
							<div>
								<p className='text-sm font-semibold'>alex</p>
								<p className='text-white/30 text-xs'>
									devstrex.vercel.app/alex
								</p>
							</div>
						</div>

						<div className='mb-6'>
							<p
								className='text-lg font-bold mb-1'
								style={{ fontFamily: "Syne, sans-serif" }}>
								30 Days of MERN
							</p>
							<p className='text-white/40 text-xs'>
								Building a full stack MERN app from scratch
							</p>
						</div>

						<div className='grid grid-cols-3 gap-3 mb-6'>
							{[
								{ label: "Streak", value: "27 days", color: "text-orange-400" },
								{ label: "Completed", value: "27/30", color: "text-green-400" },
								{ label: "Progress", value: "90%", color: "text-blue-400" },
							].map((s, i) => (
								<div key={i} className='bg-white/3 rounded-xl p-3'>
									<p className='text-white/30 text-xs mb-1'>{s.label}</p>
									<p
										className={`font-bold text-sm ${s.color}`}
										style={{ fontFamily: "Syne, sans-serif" }}>
										{s.value}
									</p>
								</div>
							))}
						</div>

						<div className='flex flex-wrap gap-1.5'>
							{Array.from({ length: 30 }, (_, i) => (
								<div
									key={i}
									className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-medium ${
										i < 27
											? "bg-orange-500 text-white"
											: "bg-white/5 text-white/20"
									}`}>
									{i + 1}
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* CTA */}
			<section className='relative z-10 border-t border-white/5'>
				<div className='max-w-6xl mx-auto px-6 py-32 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}>
						<div className='w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8'>
							<Flame className='w-8 h-8 text-white' />
						</div>
						<h2
							className='text-5xl font-bold tracking-tight mb-6'
							style={{ fontFamily: "Syne, sans-serif" }}>
							Start your streak today.
						</h2>
						<p className='text-white/40 text-lg max-w-xl mx-auto mb-10'>
							Free. No credit card. Just you, your challenge, and a streak worth
							protecting.
						</p>
						<button
							onClick={() => navigate("/auth")}
							className='inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-10 py-4 rounded-xl transition-all text-base group'>
							Create your first challenge
							<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</button>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className='relative z-10 border-t border-white/5'>
				<div className='max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<div className='flex items-center gap-2'>
						<div className='w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center'>
							<Flame className='w-3 h-3 text-white' />
						</div>
						<span
							className='text-sm font-bold'
							style={{ fontFamily: "Syne, sans-serif" }}>
							devstrex
						</span>
					</div>
					<p className='text-white/20 text-xs'>
						Built during a 30-day MERN challenge. Used to track it.
					</p>
					<div className='flex items-center gap-4'>
						<a
							href='https://x.com/iamRahul_H'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white/20 hover:text-white/50 transition-colors'>
							<Twitter className='w-4 h-4' />
						</a>
						<a
							href='https://github.com/RahulHarihar/devstrex'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white/20 hover:text-white/50 transition-colors'>
							<Github className='w-4 h-4' />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
