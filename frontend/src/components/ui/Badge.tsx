import { cn } from "@/lib/utils";

interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "success" | "danger" | "muted";
	className?: string;
}

export const Badge = ({
	children,
	variant = "default",
	className,
}: BadgeProps) => {
	const variants = {
		default: "bg-orange-500/10 text-orange-400 border-orange-500/20",
		success: "bg-green-500/10 text-green-400 border-green-500/20",
		danger: "bg-red-500/10 text-red-400 border-red-500/20",
		muted: "bg-white/5 text-white/40 border-white/10",
	};

	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border",
				variants[variant],
				className,
			)}>
			{children}
		</span>
	);
};
