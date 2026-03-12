import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin",
			className,
		)}
	/>
);
