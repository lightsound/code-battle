import {
	ContactRecord,
	deleteContact,
	getContact,
	updateContact,
} from "@repo/data";
import {
	createFileRoute,
	Link,
	notFound,
	useRouter,
} from "@tanstack/react-router";
import { useOptimistic } from "react";

export const Route = createFileRoute("/(with-sidebar)/contacts/$contactId")({
	loader: async ({ params }) => {
		const contact = await getContact(params.contactId);
		if (!contact) {
			throw notFound();
		}
		return { contact };
	},
	component: RouteComponent,
	errorComponent: () => {
		return <p>Not Found</p>;
	},
});

function RouteComponent() {
	const { contact } = Route.useLoaderData();
	const router = useRouter();

	return (
		<div id="contact">
			<div>
				<img
					alt={`${contact.first} ${contact.last} avatar`}
					key={contact.avatar}
					src={contact.avatar}
				/>
			</div>

			<div>
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}
					<Favorite contact={contact} />
				</h1>

				{contact.twitter ? (
					<p>
						<a href={`https://twitter.com/${contact.twitter}`}>
							{contact.twitter}
						</a>
					</p>
				) : null}

				{contact.notes ? <p>{contact.notes}</p> : null}

				<div>
					<Link
						to="/contacts/$contactId/edit"
						params={{ contactId: contact.id }}
					>
						<button type="button">Edit</button>
					</Link>
					<form
						id="destroy"
						action={async (formData) => {
							const response = confirm(
								"Please confirm you want to delete this record.",
							);
							if (response) {
								await deleteContact(contact.id);
								await router.navigate({ to: "/" });
								await router.invalidate();
							}
						}}
					>
						<button type="submit">Delete</button>
					</form>
				</div>
			</div>
		</div>
	);
}

function Favorite({
	contact,
}: {
	contact: Pick<ContactRecord, "id" | "favorite">;
}) {
	const router = useRouter();
	const [favorite, toggleFavorite] = useOptimistic<unknown, boolean>(
		contact.favorite,
		(_, optimisticValue) => optimisticValue,
	);

	const formAction = async (formData: FormData) => {
		const fav = formData.get("favorite");
		toggleFavorite(fav === "true");
		await updateContact(contact.id, { favorite: fav === "true" });
		await router.invalidate();
	};

	return (
		<form action={formAction}>
			<button
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
				name="favorite"
				type="submit"
				value={favorite ? "false" : "true"}
			>
				{favorite ? "★" : "☆"}
			</button>
		</form>
	);
}
