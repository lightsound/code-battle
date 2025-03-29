import { NuqsAdapter } from "nuqs/adapters/next";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja">
			<body>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
