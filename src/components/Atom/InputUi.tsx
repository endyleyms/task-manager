interface InputUiProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
  type?: string;
  name: string
}

export default function InputUi({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name
}: InputUiProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-md border text-sm shadow-sm outline-none transition duration-200`}
      />
    </div>
  );
}
