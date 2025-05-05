import "./app.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Code Battle Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
