"use server";

import { ContactRecord, updateContact } from "@repo/data";
import { revalidatePath } from "next/cache";

export async function updateFavorite(
	contactId: ContactRecord["id"],
	favorite: ContactRecord["favorite"],
) {
	await updateContact(contactId, { favorite });
	revalidatePath(`/contacts/${contactId}`);
}
