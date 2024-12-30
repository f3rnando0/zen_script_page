import { env } from "@/env";
import axios from "axios";

export const base = "https://api-m.sandbox.paypal.com";

export async function generateAccessToken() {
	try {
		const response = await axios({
			url: `${base}/v1/oauth2/token`,
			method: "POST",
			data: "grant_type=client_credentials",
			auth: {
				username: env.CLIENT_ID,
				password: env.APP_SECRET,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
}