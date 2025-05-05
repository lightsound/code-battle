"use client";

import Form, { FormProps } from "next/form";

export function ConfirmForm({
	message,
	...rest
}: FormProps & { message: string }) {
	return (
		<Form
			{...rest}
			// TODO: Arcの設定でなぜかconfirmがfalseになり戻らなくなったので、修正する
			// onSubmit={(event) => {
			// 	const response = confirm(message);
			// 	if (!response) {
			// 		event.preventDefault();
			// 	}
			// }}
		/>
	);
}
