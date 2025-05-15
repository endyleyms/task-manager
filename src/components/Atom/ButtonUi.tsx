import Typography from "./Typography";

interface props {
  title: string;
  className?: string;
  type?: 'secondary' | 'success' | 'danger' | 'warning' | 'disabled' | 'outline' | 'link';
  onClick?: () => void;
  isLoading?: boolean;
}

export default function ButtonUi({ title, className, type = 'secondary', onClick, isLoading }: props) {

  const typesButton = {
    secondary: 'h-[22px] w-full flex items-center justify-center border border-indigo-600 bg-white text-indigo-600 hover:shadow-md rounded-lg',
    success: 'h-[22px] w-full flex items-center justify-center border border-green-600 bg-green-600 text-white hover:bg-green-700 rounded-lg',
    danger: 'h-[22px] w-full flex items-center justify-center border border-red-600 bg-red-600 text-white hover:bg-red-700 rounded-lg',
    warning: 'h-[22px] w-full flex items-center justify-center border border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg',
    disabled: 'h-[22px] w-full flex items-center justify-center border border-gray-300 bg-gray-300 text-gray-600 cursor-not-allowed rounded-lg',
    outline: 'h-[22px] w-full flex items-center justify-center border border-gray-500 text-gray-800 bg-white hover:bg-gray-100 rounded-lg',
    link: 'h-[22px] w-full flex items-center justify-center border border-transparent text-blue-600 bg-white hover:underline rounded-lg'
  };

  const buttonClasses = `${typesButton[type]} ${className}`

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (!onClick) {
      return;
    }
  };


  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      disabled={isLoading}
    >
      <Typography text={isLoading ? 'Cargando...' : title} />
    </button>
  );
}
