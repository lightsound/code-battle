import { Nav } from "./_nav";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const { q } = await searchParams;
	return <Nav q={q} />;
}
