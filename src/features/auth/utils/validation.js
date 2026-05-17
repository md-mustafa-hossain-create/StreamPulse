const VALIDATION_MESSAGES = {
  EMAIL_INVALID: "Email is not valid",
  PASSWORD_INVALID: "Password is not valid",
};

const AUTH_ERRORS = {
  INVALID_EMAIL: "auth/invalid-email",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  EMAIL_IN_USE: "auth/email-already-in-use",
  WEAK_PASSWORD: "auth/weak-password",
  NETWORK_FAILED: "auth/network-request-failed",
};

const AUTH_ERROR_MESSAGES = {
  INVALID_EMAIL: "That email address doesn't look right.",
  INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
  EMAIL_IN_USE: "This email is already registered. Try signing in instead!",
  WEAK_PASSWORD: "Your password is too weak. Try at least 8 characters.",
  NETWORK_ERROR: "Check your internet connection and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
};

export const checkValidData = (email, password) => {
  const isEmailValid =
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return VALIDATION_MESSAGES.EMAIL_INVALID;
  if (!isPasswordValid) return VALIDATION_MESSAGES.PASSWORD_INVALID;

  return null;
};

export const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case AUTH_ERRORS.INVALID_EMAIL:
      return AUTH_ERROR_MESSAGES.INVALID_EMAIL;
    case AUTH_ERRORS.USER_NOT_FOUND:
    case AUTH_ERRORS.WRONG_PASSWORD:
    case AUTH_ERRORS.INVALID_CREDENTIAL:
      return AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS;
    case AUTH_ERRORS.EMAIL_IN_USE:
      return AUTH_ERROR_MESSAGES.EMAIL_IN_USE;
    case AUTH_ERRORS.WEAK_PASSWORD:
      return AUTH_ERROR_MESSAGES.WEAK_PASSWORD;
    case AUTH_ERRORS.NETWORK_FAILED:
      return AUTH_ERROR_MESSAGES.NETWORK_ERROR;
    default:
      return AUTH_ERROR_MESSAGES.GENERIC_ERROR;
  }
};
