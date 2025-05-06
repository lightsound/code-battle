"use client";

import Form, { FormProps } from "next/form";

export function ConfirmForm({
	message,
	...rest
}: FormProps & { message: string }) {
	return (
		<Form
			{...rest}
			onSubmit={(event) => {
				const response = confirm(message);
				if (!response) {
					event.preventDefault();
				}
			}}
		/>
	);
}
