import axios from "axios";
import { base, generateAccessToken } from "../utils";
import { randomUUID } from "node:crypto";

export async function POST(req: Request) {
	const { access_token } = await generateAccessToken();

	if (access_token) {
		const response = await axios({
			url: `${base}/v2/checkout/orders`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
			data: JSON.stringify({
				intent: "CAPTURE",
				purchase_units: [
					{
						amount: {
							currency_code: "USD",
							value: "50.00",
						},
						reference_id: randomUUID(),
					},
				],
			}),
		});

		return Response.json(response.data);
	}

	return Response.error();
}
