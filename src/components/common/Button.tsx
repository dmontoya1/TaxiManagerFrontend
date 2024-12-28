interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  isLoading,
}: ButtonProps) {
  const baseStyle =
    "w-full py-2 px-4 font-bold rounded-lg shadow-lg transition-all focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
}