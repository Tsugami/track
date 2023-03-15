import type { Customer } from "@prisma/client";
import { prisma } from "~/db.server";

export function getCustomerByName(name: Customer["name"]) {
  return prisma.customer.findFirst({
    where: { name: { mode: "insensitive", equals: name } },
  });
}
