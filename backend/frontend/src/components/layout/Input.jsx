import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";


export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword? "text" : "password") : type
          }
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        )}
        </div>
    </div>
  );
}
