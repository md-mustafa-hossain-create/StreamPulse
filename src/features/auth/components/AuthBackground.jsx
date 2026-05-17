import authBackground from "../../../assets/authBackground-bg.jpg";

/**
 * NOTE: cinematic background component for the authentication screens
 * applies a custom 3D transform and multi-layered gradient overlays to create depth
 * and focus for the foreground auth card
 */
const AuthBackground = () => {
  return (
    <>
      <img
        src={authBackground}
        className="w-full h-full object-cover"
        style={{
          transform:
            "perspective(600px) rotateY(-12deg) rotateX(15deg) rotateZ(-7deg) scale(1.6) translateY(-20%) translateX(-15%)",
          transformOrigin: "center center",
        }}
      />
      <div
        className="absolute inset-0 bg-black/50 "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8) 0, transparent 35%, transparent 80%, rgba(0,0,0,0.8) 100%), linear-gradient(to right, rgba(0,0,0,0.7) 0, transparent 8%, transparent 92%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </>
  );
};

export default AuthBackground;
