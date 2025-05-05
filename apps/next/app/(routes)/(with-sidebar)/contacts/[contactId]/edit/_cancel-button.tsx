"use client";
import { useRouter } from "next/navigation";

export function CancelButton({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<button onClick={() => router.back()} type="button">
			{children}
		</button>
	);
}
