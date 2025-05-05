"use client";

import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
import { useFormStatus } from "react-dom";

const QUERY_KEY = "q";

export function SearchInput() {
	const { pending } = useFormStatus();
	const sp = useSearchParams();
	const q = sp.get(QUERY_KEY);

	// useEffect(() => {
	// 	const searchField = document.getElementById("q");
	// 	if (searchField instanceof HTMLInputElement) {
	// 		searchField.value = q || "";
	// 	}
	// }, [q]);

	return (
		<>
			<input
				aria-label="Search contacts"
				className={pending ? "loading" : ""}
				defaultValue={q || ""}
				id={QUERY_KEY}
				name={QUERY_KEY}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.currentTarget.form?.requestSubmit();
				}}
				placeholder="Search"
				type="search"
			/>
			<div aria-hidden hidden={!pending} id="search-spinner" />
		</>
	);
}
