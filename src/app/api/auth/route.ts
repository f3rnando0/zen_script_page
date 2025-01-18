import { env } from "@/env";

export async function POST(req: Request) {
	const body = await req.json();

	if (!body.key) {
		return Response.error();
	}

	if (body.key === env.SECRET_KEY) {
		return Response.json({ success: true });
	}

	return Response.error();
}
