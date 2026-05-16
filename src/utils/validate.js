import { AUTH_ERRORS, AUTH_ERROR_MESSAGES, VALIDATION_MESSAGES } from "./constants";

/**
 * NOTE: performs client-side validation for authentication forms
 * ensures basic data integrity before attempting firebase API calls to reduce latency and server load
 */
export const checkValidData=(email, password)=>{
    // validating email structure against standard RFC 5322 patterns
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    // enforcing strong password policy: min 8 chars, including uppercase, lowercase, and numeric digits
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isEmailValid) return VALIDATION_MESSAGES.EMAIL_INVALID;
    if(!isPasswordValid) return VALIDATION_MESSAGES.PASSWORD_INVALID;

    return null;

}

/**
 * NOTE: maps technical firebase error codes to user-friendly, localized messages
 * provides meaningful feedback to the user while obscuring specific backend failure details for security
 */
export const getFriendlyErrorMessage = (errorCode) => {
  // switch-case logic to handle known firebase auth error codes
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