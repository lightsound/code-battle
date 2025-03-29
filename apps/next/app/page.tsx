import Form from "next/form";
import { Search } from "./search";
import type { UserApiResponse } from "./types";
import { upfetch } from "./upfetch";

type SearchParams = Promise<{
	q?: string;
	sortBy?: string;
	order?: "asc" | "desc";
}>;

export default async function Home({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const sp = await searchParams;
	const data = await upfetch<UserApiResponse>("/users/search", { params: sp });

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 20,
				padding: 40,
			}}
		>
			<Search />
			{/* <Form action="" style={{ display: "flex", gap: 10 }}>
				<input type="text" name="q" defaultValue={sp.q || ""} />

				<select name="sortBy" defaultValue={sp.sortBy || ""}>
					<option value="">--</option>
					<option value="age">年齢</option>
					<option value="height">身長</option>
					<option value="weight">体重</option>
				</select>

				<div>
					<label>
						<input
							type="radio"
							name="order"
							value="asc"
							defaultChecked={sp.order === "asc"}
						/>
						asc
					</label>
					<label>
						<input
							type="radio"
							name="order"
							value="desc"
							defaultChecked={sp.order === "desc"}
						/>
						desc
					</label>
				</div>

				<button type="submit">Search</button>
			</Form> */}

			<table
				style={{
					borderCollapse: "collapse",
					fontSize: 12,
					marginBottom: "20px",
					width: "100%",
				}}
			>
				<thead>
					<tr>
						<Th>画像</Th>
						<Th>氏名</Th>
						<Th>ユーザー名</Th>
						<Th>性別</Th>
						<Th>年齢</Th>
						<Th>身長</Th>
						<Th>体重</Th>
					</tr>
				</thead>
				<tbody>
					{data.users.map((user, index) => (
						<tr
							key={user.id}
							style={{ backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9" }}
						>
							<Td>
								<img
									alt={user.firstName}
									src={user.image}
									style={{ height: "40px", width: "40px" }}
								/>
							</Td>
							<Td>{`${user.firstName} ${user.lastName}`}</Td>
							<Td>{`@${user.username}`}</Td>
							<Td>{user.gender}</Td>
							<Td>{user.age}</Td>
							<Td>{`${user.height}cm`}</Td>
							<Td>{`${user.weight}kg`}</Td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Th({ children }: { children: React.ReactNode }) {
	return (
		<th style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd" }}>
			{children}
		</th>
	);
}

function Td({ children }: { children: React.ReactNode }) {
	return <td style={{ border: "1px solid #ddd" }}>{children}</td>;
}
