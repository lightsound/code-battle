import { getContact, updateContact } from "@repo/data";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";
import { CancelButton } from "./_cancel-button";

export default async function Page({
	params,
}: {
	params: Promise<{ contactId: string }>;
}) {
	const { contactId } = await params;
	const contact = await getContact(contactId);

	if (!contact) {
		redirect("/");
	}

	async function edit(formData: FormData) {
		"use server";
		const updates = Object.fromEntries(formData);
		await updateContact(contactId, updates);
		revalidatePath("/");
		redirect(`/contacts/${contactId}`);
	}

	return (
		<Form action={edit} id="contact-form">
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
				<CancelButton>Cancel</CancelButton>
			</p>
		</Form>
	);
}
