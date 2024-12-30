import axios, { isAxiosError } from "axios";
import { base, generateAccessToken } from "../utils";

export async function POST(req: Request) {
	const { orderID } = await req.json();

	if (!orderID) {
		return Response.error();
	}

	const { access_token } = await generateAccessToken();

	if (access_token) {
		try {
			const response = await axios({
				url: `${base}/v2/checkout/orders/${orderID}/capture`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`,
				},
			});

			return Response.json(response.data.status);
		} catch (error) {
			if (isAxiosError(error)) {
				console.error(error.response);
				console.error(error.response?.data);
			}

			return Response.error();
		}
	}
}
