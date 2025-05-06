"use client";

export function CreateContactButton({
	action,
	children,
}: {
	action: () => Promise<void>;
	children: React.ReactNode;
}) {
	return (
		<button onClick={action} type="button">
			{children}
		</button>
	);
}
