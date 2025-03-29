"use client";

import { useQueryState } from "nuqs";

export function Search() {
	const [name, setName] = useQueryState("q", { shallow: false });
	const [sortBy, setSortBy] = useQueryState("sortBy", { shallow: false });
	const [order, setOrder] = useQueryState("order", { shallow: false });

	return (
		<div style={{ display: "flex", gap: 10 }}>
			<input onChange={(e) => setName(e.target.value)} value={name || ""} />

			<select onChange={(e) => setSortBy(e.target.value)} value={sortBy || ""}>
				<option value="">--</option>
				<option value="age">年齢</option>
				<option value="height">身長</option>
				<option value="weight">体重</option>
			</select>

			<div>
				<label>
					<input
						checked={order === "asc"}
						name="order"
						onChange={(e) => setOrder(e.target.value)}
						type="radio"
						value="asc"
					/>
					asc
				</label>
				<label>
					<input
						checked={order === "desc"}
						name="order"
						onChange={(e) => setOrder(e.target.value)}
						type="radio"
						value="desc"
					/>
					desc
				</label>
			</div>

			<button
				onClick={() => {
					setName(null);
					setSortBy(null);
					setOrder(null);
				}}
				type="reset"
			>
				Clear
			</button>
		</div>
	);
}
