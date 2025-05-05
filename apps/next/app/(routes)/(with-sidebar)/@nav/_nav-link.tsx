"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
	children,
	...rest
}: React.ComponentProps<typeof Link>) {
	const pathname = usePathname();
	const isActive = pathname.startsWith(rest.href.toString());

	return (
		<Link {...rest}>
			<Div isActive={isActive}>{children}</Div>
		</Link>
	);
}

function Div({
	className,
	isActive,
	...rest
}: React.ComponentPropsWithoutRef<"div"> & { isActive: boolean }) {
	const { pending } = useLinkStatus();

	return (
		<div
			className={cn(
				className,
				isActive ? "active" : "",
				pending ? "pending" : "",
			)}
			{...rest}
		/>
	);
}

function cn(...args: (string | undefined)[]) {
	return args.filter(Boolean).join(" ");
}
