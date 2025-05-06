import { createEmptyContact } from "@repo/data";
import {
	isRouteErrorResponse,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import appStylesHref from "./app.css?url";

export function meta() {
	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ title: "Code Battle React Router" },
	];
}

export async function action() {
	const contact = await createEmptyContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<Meta />
				<link href={appStylesHref} rel="stylesheet" />
			</head>
			<body suppressHydrationWarning>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main id="error-page">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

export function HydrateFallback() {
	return (
		<div id="loading-splash">
			<div id="loading-splash-spinner" />
			<p>Loading, please wait...</p>
		</div>
	);
}

export default function App() {
	return <Outlet />;
}
