import { prisma } from "~/db.server";

export const getOrderByIdAndCustomer = (
  customerId: string,
  orderId: string
) => {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: { user: true, customer: true },
  });
};
