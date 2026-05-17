import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { Button, Input } from "../components/ui";
import { auth } from "../lib/firebase";
import AuthBackground from "../features/auth/components/AuthBackground";
import {
  checkValidData,
  getFriendlyErrorMessage,
} from "../features/auth/utils/validation";
import { addUser } from "../features/auth/userSlice";
import { APP_NAME } from "../constants/app";
import { ROUTES } from "../constants/routes";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = checkValidData(email, password);
    setErrorMessage(message);
    if (message) return;

    if (isSignUpForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(getFriendlyErrorMessage(error.code));
        });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setErrorMessage(getFriendlyErrorMessage(error.code));
      });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrorMessage(null);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleToggleForm = () => {
    setIsSignUpForm(!isSignUpForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AuthBackground />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[480px] text-white p-10 sm:p-14 flex flex-col gap-12 justify-center md:min-h-[600px] sm:rounded-[40px] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)] bg-linear-to-b from-black/60 to-black/40 backdrop-blur-3xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-red-600/5 via-transparent to-transparent pointer-events-none" />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {isSignUpForm ? "Create Account" : "Welcome Back"}
            </h1>

            <div className="flex flex-col gap-6">
              {isSignUpForm && (
                <Input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  placeholder="Full Name"
                  onChange={handleNameChange}
                />
              )}

              <Input
                type="text"
                name="email"
                required
                autoComplete="username"
                value={email}
                placeholder="Email or phone number"
                onChange={handleEmailChange}
              />

              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                autoComplete={
                  isSignUpForm ? "new-password" : "current-password"
                }
                placeholder="Password"
                onChange={handlePasswordChange}
                suffix={
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              <div className="min-h-[24px]">
                {errorMessage && (
                  <p className="text-brand-red font-medium text-sm pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Button
              variants="primary"
              type="submit"
              className="py-4 text-base shadow-lg"
            >
              {isSignUpForm ? "Sign Up" : "Sign In"}
            </Button>

            {!isSignUpForm && (
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="w-4 h-4 mt-[2px] cursor-pointer accent-brand-red rounded border-gray-600 bg-gray-700"
                  />
                  <label
                    htmlFor="remember"
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Remember Me
                  </label>
                </div>
                <Link
                  to={ROUTES.HOME}
                  className="hover:underline hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>
        </form>

        <div className="text-gray-400 pt-8 mt-4 border-t border-white/10">
          <span className="text-sm">
            {isSignUpForm
              ? "Already have an account? "
              : `New to ${APP_NAME}? `}
          </span>
          <button
            className="text-white font-bold hover:underline cursor-pointer transition-all"
            onClick={handleToggleForm}
          >
            {isSignUpForm ? "Sign In Now" : "Sign Up Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
