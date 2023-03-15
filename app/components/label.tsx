export function Label({
  className,
  ...props
}: JSX.IntrinsicElements["label"]) {
  return <label className="block font-medium text-gray-400 ml-2" {...props} />;
}
