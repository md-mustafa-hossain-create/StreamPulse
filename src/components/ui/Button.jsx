/**
 * NOTE: industrial-grade button component supporting multiple design variants
 * implements tactile feedback via scaling transitions and maintains consistent branding
 */
const Button = ({
  variants = "primary",
  children,
  className = "",
  ...props
}) => {
  // core styles for layout, transitions, and click feedback
  const baseStyle =
    "transition duration-300 cursor-pointer font-bold flex items-center justify-center gap-1 active:scale-95";
  // design-system specific variants for different UI contexts
  const variantsStyle = {
    primary:
      "bg-brand-red hover:bg-brand-red-dark text-sm rounded-lg  px-4 py-3 ",
    avatar:
      "bg-brand-red text-white rounded-full w-10 h-10 group-hover:bg-brand-red-dark",
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
