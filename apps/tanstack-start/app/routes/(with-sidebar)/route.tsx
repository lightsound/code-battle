import { createEmptyContact, getContacts } from "@repo/data";
import {
	createFileRoute,
	Link,
	Outlet,
	useRouter,
	useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(with-sidebar)")({
	validateSearch: (search): { q?: string } => ({
		q: (search.q as string) || undefined,
	}),
	loaderDeps: ({ search: { q } }) => ({ q }),
	loader: async ({ deps: { q } }) => {
		const contacts = await getContacts(q);
		return { contacts, q };
	},
	component: RouteComponent,
	staleTime: 5000,
});

function RouteComponent() {
	const { contacts, q } = Route.useLoaderData();
	const router = useRouter();
	const { isLoading: searching } = useRouterState();

	return (
		<>
			<div id="sidebar">
				<h1>
					<Link to="/about">TanStack Start Contacts</Link>
				</h1>
				<div>
					<form
						id="search-form"
						onChange={(event) => {
							const isFirstSearch = q === undefined;
							router.navigate({
								to: "/",
								search: { q: event.currentTarget.q.value },
								replace: !isFirstSearch,
							});
						}}
					>
						<input
							aria-label="Search contacts"
							className={searching ? "loading" : ""}
							defaultValue={q || ""}
							id="q"
							name="q"
							placeholder="Search"
							type="search"
						/>
						<div aria-hidden hidden={!searching} id="search-spinner" />
					</form>
					<form
						action={async () => {
							const contact = await createEmptyContact();
							await router.invalidate({ sync: true });
							await router.navigate({
								to: "/contacts/$contactId/edit",
								params: { contactId: contact.id },
							});
						}}
					>
						<button type="submit">New</button>
					</form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<Link
										// className={({ isActive, isPending }) =>
										// 	isActive ? "active" : isPending ? "pending" : ""
										// }
										activeProps={{ className: "active" }}
										to="/contacts/$contactId"
										params={{ contactId: contact.id }}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{contact.favorite ? <span>★</span> : null}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div
				// className={
				// 	navigation.state === "loading" && !searching ? "loading" : ""
				// }
				id="detail"
			>
				<Outlet />
			</div>
		</>
	);
}
