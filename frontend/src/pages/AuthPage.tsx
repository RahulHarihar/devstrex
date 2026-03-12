import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login, signup, saveAuth } from "@/services/authService";
import { Flame } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		setError(null);
		setLoading(true);
		try {
			const user = isLogin
				? await login({ email, password })
				: await signup({ email, password, username });
			saveAuth(user);
			navigate("/dashboard");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const inputClass =
		"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all text-sm";

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#080808] px-4'>
			{/* Background glow */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl' />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md relative'>
				{/* Logo */}
				<div className='flex flex-col items-center mb-10'>
					<div className='w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4'>
						<Flame className='w-6 h-6 text-white' />
					</div>
					<h1
						className='text-3xl font-bold tracking-tight'
						style={{ fontFamily: "Syne, sans-serif" }}>
						devstreak
					</h1>
					<p className='text-white/30 text-sm mt-2'>
						{isLogin ? "Welcome back" : "Start your streak today"}
					</p>
				</div>

				{/* Card */}
				<div className='bg-[#111111] border border-white/5 rounded-2xl p-8'>
					{/* Toggle */}
					<div className='flex bg-white/5 rounded-xl p-1 mb-8'>
						{["Login", "Sign Up"].map((tab) => (
							<button
								key={tab}
								onClick={() => {
									setIsLogin(tab === "Login");
									setError(null);
								}}
								className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
									(isLogin && tab === "Login") ||
									(!isLogin && tab === "Sign Up")
										? "bg-orange-500 text-white"
										: "text-white/40 hover:text-white/60"
								}`}>
								{tab}
							</button>
						))}
					</div>

					<AnimatePresence mode='wait'>
						<motion.div
							key={isLogin ? "login" : "signup"}
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ duration: 0.2 }}
							className='space-y-4'>
							<input
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={inputClass}
							/>
							{!isLogin && (
								<input
									type='text'
									placeholder='Username'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className={inputClass}
								/>
							)}
							<input
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
								className={inputClass}
							/>
						</motion.div>
					</AnimatePresence>

					{error && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-red-400 text-sm mt-4'>
							{error}
						</motion.p>
					)}

					<button
						onClick={handleSubmit}
						disabled={loading}
						className='w-full mt-6 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2'>
						{loading ? (
							<Spinner className='w-4 h-4' />
						) : isLogin ? (
							"Login"
						) : (
							"Create Account"
						)}
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default AuthPage;
