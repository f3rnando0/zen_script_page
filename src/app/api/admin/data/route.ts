import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const header = req.headers.get("X-Admin-Password");

  if (!header) {
    return Response.error();
  }

  if (header === env.SECRET_KEY) {
    let product = await prisma.product.findFirst({});

    if (!product) {
      product = await prisma.product.create({
        data: {},
      });
    }

    return Response.json({
      views: product.views,
      downloads: product.downloads,
      orders: product.orders,
    });
  }

  return Response.error();
}
