import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-sidebar)/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <p>TanStack Start Home</p>;
}
