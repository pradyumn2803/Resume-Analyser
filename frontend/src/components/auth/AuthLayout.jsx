export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
