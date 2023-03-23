import { Customer } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

interface JSONStyles {
  primaryColor: string;
  primaryHoverColor: string;
  outlineColor: string;
}

export const useStyles = (): JSONStyles => {
  const customer = useLoaderData<Customer>();

  const defaultStyles: JSONStyles = {
    primaryColor: "rgb(248 113 113 / 1)",
    primaryHoverColor: "rgb(59 130 246 / 1)",
    outlineColor: "#93c5fd",
  };

  const customerStyles = customer.styles as unknown as Partial<JSONStyles>;

  return {
    primaryColor: customerStyles.primaryColor ?? defaultStyles.primaryColor,
    primaryHoverColor:
      customerStyles.primaryHoverColor ?? defaultStyles.primaryHoverColor,
    outlineColor: customerStyles.outlineColor ?? defaultStyles.outlineColor,
  };
};
