import { deleteContact } from "@repo/data";
import { redirect } from "react-router";
import type { Route } from "./+types/destroy-contact";

export async function action({ params }: Route.ActionArgs) {
	await deleteContact(params.contactId);
	return redirect("/");
}
