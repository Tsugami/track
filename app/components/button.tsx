export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="bg-blue-400 text-white hover:bg-blue-500 py-2 font-medium focus:ring-blue-500 focus:ring-offset-white disabled:opacity-80 disabled:cursor-not-allowed"
      {...props}
    />
  );
}
