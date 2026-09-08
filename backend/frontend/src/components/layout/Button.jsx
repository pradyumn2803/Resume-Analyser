export default function Button({
  children,
  type = "button",
  onClick,
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:scale-100"
    >
      {children}
    </button>
  );
}
