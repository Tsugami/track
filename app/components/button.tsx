export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="bg-blue-400 py-2 font-medium text-white outline-2 outline-offset-2 outline-blue-300 hover:bg-blue-500 focus:outline disabled:cursor-not-allowed disabled:opacity-80"
      {...props}
    />
  );
}
