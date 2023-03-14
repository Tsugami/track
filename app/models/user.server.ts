import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getByCpf(identify_cpf: User["identify_cpf"]) {
  return prisma.user.findUnique({ where: { identify_cpf } });
}
