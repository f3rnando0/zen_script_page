import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  let product = await prisma.product.findFirst({});

  if (!product) {
    product = await prisma.product.create({
      data: {},
    });
  }

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      views: product.views + 1,
    },
  });

  return Response.json({});
}
