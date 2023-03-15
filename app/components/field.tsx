export function Field({ className, ...props }: JSX.IntrinsicElements["div"]) {
  return <div className="flex flex-col space-y-2" {...props} />;
}
