import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div id="about">
			<Link to="/">← Go to home</Link>
			<h1>TanStack Start About</h1>
		</div>
	);
}
