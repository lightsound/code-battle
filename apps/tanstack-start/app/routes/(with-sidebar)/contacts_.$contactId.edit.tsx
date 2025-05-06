import { getContact, updateContact } from "@repo/data";
import {
	createFileRoute,
	redirect,
	useCanGoBack,
	useRouter,
} from "@tanstack/react-router";
// import { createServerFn } from "@tanstack/react-start";

// export const update = createServerFn({ method: "POST", response: "data" })
// 	.validator((formData) => {
// 		if (!(formData instanceof FormData)) {
// 			throw new Error("Invalid form data");
// 		}
// 		const contactId = formData.get("contactId");
// 		if (!contactId) {
// 			throw new Error("Contact ID is required");
// 		}
// 		return {
// 			contactId: contactId.toString(),
// 			updates: Object.fromEntries(formData),
// 		};
// 	})
// 	.handler(async ({ data: { contactId, updates } }) => {
// 		await updateContact(contactId, updates);
// 		throw redirect({
// 			to: "/contacts/$contactId",
// 			params: { contactId },
// 		});
// 	});

export const Route = createFileRoute(
	"/(with-sidebar)/contacts_/$contactId/edit",
)({
	loader: async ({ params }) => {
		const contact = await getContact(params.contactId);
		if (!contact) {
			throw redirect({ to: "/" });
		}
		return { contact };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { contact } = Route.useLoaderData();
	const router = useRouter();
	const canGoBack = useCanGoBack();

	return (
		<form
			action={async (formData) => {
				const updates = Object.fromEntries(formData);
				await updateContact(contact.id, updates);
				await router.invalidate({ sync: true });
				router.navigate({
					to: "/contacts/$contactId",
					params: { contactId: contact.id },
				});
			}}
			id="contact-form"
			key={contact.id}
		>
			<p>
				<span>Name</span>
				<input
					aria-label="First name"
					defaultValue={contact.first}
					name="first"
					placeholder="First"
					type="text"
				/>
				<input
					aria-label="Last name"
					defaultValue={contact.last}
					name="last"
					placeholder="Last"
					type="text"
				/>
			</p>
			<label>
				<span>Twitter</span>
				<input
					defaultValue={contact.twitter}
					name="twitter"
					placeholder="@jack"
					type="text"
				/>
			</label>
			<label>
				<span>Avatar URL</span>
				<input
					aria-label="Avatar URL"
					defaultValue={contact.avatar}
					name="avatar"
					placeholder="https://example.com/avatar.jpg"
					type="text"
				/>
			</label>
			<label>
				<span>Notes</span>
				<textarea defaultValue={contact.notes} name="notes" rows={6} />
			</label>
			<p>
				<button type="submit">Save</button>
				<button
					onClick={() => {
						canGoBack
							? router.history.back()
							: router.navigate({
									to: "/contacts/$contactId",
									params: { contactId: contact.id },
								});
					}}
					type="button"
				>
					Cancel
				</button>
			</p>
		</form>
	);
}
