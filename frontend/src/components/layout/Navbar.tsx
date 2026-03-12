import { useNavigate } from "react-router-dom";
import { clearAuth, getUsername } from "@/services/authService";
import { Flame, LogOut, Plus, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
	const navigate = useNavigate();
	const username = getUsername();

	const handleLogout = () => {
		clearAuth();
		navigate("/auth");
	};

	return (
		<motion.nav
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className='border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl sticky top-0 z-50'>
			<div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
				<button
					onClick={() => navigate("/dashboard")}
					className='flex items-center gap-2 group'>
					<div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-400 transition-colors'>
						<Flame className='w-4 h-4 text-white' />
					</div>
					<span
						className='text-lg font-bold tracking-tight'
						style={{ fontFamily: "Syne, sans-serif" }}>
						devstreak
					</span>
				</button>

				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate("/challenges/new")}
						className='flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors'>
						<Plus className='w-4 h-4' />
						New Challenge
					</button>

					<button
						onClick={() => navigate(`/${username}`)}
						className='flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5'>
						<User className='w-4 h-4' />
						<span className='hidden sm:inline'>{username}</span>
					</button>

					<button
						onClick={handleLogout}
						className='text-white/30 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10'>
						<LogOut className='w-4 h-4' />
					</button>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
