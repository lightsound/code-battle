import { deleteContact, getContact } from "@repo/data";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ConfirmForm } from "./_confirm-form";
import { Favorite } from "./_favorite";

export default async function Page({
	params,
}: {
	params: Promise<{ contactId: string }>;
}) {
	const { contactId } = await params;
	const contact = await getContact(contactId);

	if (!contact) {
		notFound();
	}

	async function destroyContact() {
		"use server";
		await deleteContact(contactId);
		redirect("/");
	}

	return (
		<div id="contact">
			<div>
				<img
					alt={`${contact.first} ${contact.last} avatar`}
					key={contact.avatar}
					src={contact.avatar || undefined}
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
					<Link href={`/contacts/${contactId}/edit`}>
						<button type="button">Edit</button>
					</Link>

					<ConfirmForm
						action={destroyContact}
						id="destroy"
						message="Please confirm you want to delete this record."
					>
						<button type="submit">Delete</button>
					</ConfirmForm>
				</div>
			</div>
		</div>
	);
}
