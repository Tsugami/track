import { css } from "@emotion/css";
import { Customer } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useStyles } from "~/hooks/useStyles";

export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  const colors = useStyles();

  const styles = css`
    background-color: ${colors.primaryColor};
    outline-color: ${colors.outlineColor};
    &:hover {
      background-color: ${colors.primaryHoverColor};
    }
  `;

  return (
    <button
      className={clsx(
        "py-2 font-medium text-white outline-2 outline-offset-2 outline-blue-300 focus:outline disabled:cursor-not-allowed disabled:opacity-80",
        styles
      )}
      {...props}
    />
  );
}
