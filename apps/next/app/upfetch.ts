import { up } from "up-fetch";

export const upfetch: ReturnType<typeof up> = up(fetch, () => ({
	baseUrl: "https://dummyjson.com",
}));
