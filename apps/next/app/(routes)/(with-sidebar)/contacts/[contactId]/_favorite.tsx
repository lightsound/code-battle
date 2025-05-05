"use client";

import type { ContactRecord } from "@repo/data";
import { useOptimistic } from "react";
import { updateFavorite } from "./_update-favorite";

export function Favorite({
	contact,
}: {
	contact: Pick<ContactRecord, "id" | "favorite">;
}) {
	const [favorite, toggleFavorite] = useOptimistic(
		contact.favorite,
		(favorite) => !favorite,
	);

	const formAction = async (formData: FormData) => {
		const fav = formData.get("favorite");
		toggleFavorite(fav === "true");
		await updateFavorite(contact.id, fav === "true");
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
