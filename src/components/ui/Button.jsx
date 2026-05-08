const Button = ({
  variants = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyle =
    "transition duration-300 cursor-pointer font-bold flex items-center justify-center gap-1 active:scale-95";
  const variantsStyle = {
    primary:
      "bg-brand-red hover:bg-brand-red-dark text-sm rounded-lg  px-4 py-3 ",
    avatar:
      "bg-brand-red text-white rounded-full w-10 h-10 hover:bg-brand-red-dark",
    ghost: "text-brand-red hover:underline text-sm p-0 bg-transparent",
  };
  return (
    <button
      className={`${baseStyle} ${variantsStyle[variants] ?? variantsStyle.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
