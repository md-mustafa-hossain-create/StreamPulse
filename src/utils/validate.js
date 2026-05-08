export const checkValidData=(email, password)=>{
    const isEmailValid= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)

    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isEmailValid)return "Email is not valid";
    if(!isPasswordValid)return "Password is not valid";

    return null;

}

export const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead!";
    case "auth/weak-password":
      return "Your password is too weak. Try at least 8 characters.";
    case "auth/network-request-failed":
      return "Check your internet connection and try again.";
    default:
      return "Something went wrong. Please try again later.";
  }
};