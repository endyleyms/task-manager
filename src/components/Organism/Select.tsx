
interface Option {
  label: string;
  value: string;
}

interface props {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  className = "",
}: props) {
  return (
    <div className={`flex flex-row gap-4 ${className}`}>
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
