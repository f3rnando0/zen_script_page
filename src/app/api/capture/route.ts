import axios, { isAxiosError } from "axios";
import { base, generateAccessToken } from "../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

			if (response.data?.status === "COMPLETED") {
				const order = await prisma.order.findFirst({
					where: {
						id: response.data.id,
					},
				});

				if (!order) {
					await prisma.order.create({
						data: {
							id: response.data.id,
							amount: response.data.payments.captures[0].amount.value,
							status: response.data.status,
						},
					});
				}
			}

			return Response.json(response.data.status);
		} catch (error) {
			if (isAxiosError(error)) {
				console.error(error.response);
				console.error(error.response?.data);
			}

			return Response.error();
		}
	}

	return Response.error();
}
