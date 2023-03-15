import * as React from "react";
import { IMaskMixin } from "react-imask";

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"] & { "data-type": string }
>(({ type = "text", className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className="rounded-md border p-2 outline-2 outline-offset-2 outline-blue-300 focus:outline disabled:cursor-not-allowed disabled:opacity-80"
      {...props}
    />
  );
});

export const MaskInput = IMaskMixin(({ inputRef, ...props }) => <Input ref={inputRef} {...props} />)
