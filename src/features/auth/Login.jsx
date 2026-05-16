import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input"; // NOTE: using a modular input component to maintain design consistency across forms
import { checkValidData, getFriendlyErrorMessage } from "../../utils/validate";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import { auth } from "../../lib/firebase";
import AuthBackground from "./components/AuthBackground";
import { APP_NAME, ROUTES } from "../../utils/constants";

/**
 * NOTE: primary authentication feature component handling both Login and Sign-Up flows
 * utilizes firebase auth for identity management and redux for session persistence
 * design follows a "nebula glass" aesthetic with backdrop blurs and cinematic backgrounds
 */
const Login = () => {
  const dispatch = useDispatch();
  // state management for form inputs, visibility toggles, and authentication feedback
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // logic for form interactions and firebase authentication workflows
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = checkValidData(email, password);
    setErrorMessage(message);
    if (message) return;

    if (isSignUpForm) {
      // initializing new user account creation via firebase auth
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // attaching the user's display name to their newly created firebase profile
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              // synchronizing the local redux store with the updated firebase user metadata
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                }),
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(getFriendlyErrorMessage(error.code));
        });
    } else {
      // executing user authentication for existing accounts
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // NOTE: successful authentication handled; routing logic is centralized in the parent component
          // TODO: implement post-login greeting or analytics triggers if required
        })
        .catch((error) => {
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
      {/* rendering the cinematic animated background for the auth screen */}
      <div className="absolute inset-0 z-0">
        <AuthBackground />
      </div>

      {/* the main authentication container featuring glassmorphism and depth effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[480px] text-white p-10 sm:p-14 flex flex-col gap-12 justify-center md:min-h-[600px] sm:rounded-[40px] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)] bg-linear-to-b from-black/60 to-black/40 backdrop-blur-3xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-red-600/5 via-transparent to-transparent pointer-events-none" />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* grouping the dynamic form title and input fields for layout structure */}
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {isSignUpForm ? "Create Account" : "Welcome Back"}
            </h1>

            {/* individual form fields for user credentials */}
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

              {/* reserved space for validation errors to prevent layout shifts during interaction */}
              <div className="min-h-[24px]">
                {errorMessage && (
                  <p className="text-brand-red font-medium text-sm pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* primary submission controls and auxiliary authentication links */}
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

        {/* toggle between sign-in and sign-up form states */}
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
