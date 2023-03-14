import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const identify_cpf = "805.139.446-13";

  const user = await prisma.user.create({
    data: {
      identify_cpf,
    },
    select: {
      id: true,
    },
  });

  const data = [
    { customerName: "Nubank", productName: "Cartão Nu" },
    { customerName: "Amazon", productName: "Alexa" },
    { customerName: "LOUD", productName: "Calça oficial" },
  ];

  await Promise.all(
    data.map((data) =>
      prisma.customer.create({
        data: {
          name: data.customerName,
          order: {
            create: { productName: data.productName, userId: user.id },
          },
        },
      })
    )
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
