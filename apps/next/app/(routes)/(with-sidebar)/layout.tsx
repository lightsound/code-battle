import { createEmptyContact } from "@repo/data";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CreateContactButton } from "./_create-contact-button";
import { SearchInput } from "./_search-input";

export default async function Layout({
	children,
	nav,
}: {
	children: React.ReactNode;
	nav: React.ReactNode;
}) {
	async function create() {
		"use server";
		const contact = await createEmptyContact();
		revalidatePath("/");
		redirect(`/contacts/${contact.id}/edit`);
	}

	return (
		<>
			<div id="sidebar">
				<h1>
					<Link href="about">Next.js Contacts</Link>
				</h1>
				<div>
					<Form action="/" id="search-form" replace>
						<Suspense fallback={null}>
							<SearchInput />
						</Suspense>
					</Form>
					<CreateContactButton action={create}>New</CreateContactButton>
				</div>
				{nav}
			</div>
			<div
				// className={
				// 	navigation.state === "loading" && !searching ? "loading" : ""
				// }
				id="detail"
			>
				{children}
			</div>
		</>
	);
}
