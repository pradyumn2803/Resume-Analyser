export default function Button({ children, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 font-semibold transition hover:scale-[1.02]"
    >
      {children}
    </button>
  );
}
