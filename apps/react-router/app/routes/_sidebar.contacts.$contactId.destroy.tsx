import { deleteContact } from "@repo/data";
import { redirect } from "react-router";
import type { Route } from "./+types/_sidebar.contacts.$contactId.destroy";

export async function action({ params }: Route.ActionArgs) {
	await deleteContact(params.contactId);
	return redirect("/");
}
