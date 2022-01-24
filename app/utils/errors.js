const errors = {
  // Signing up
  "auth/email-already-in-use": "That email address is already in use.",
  "auth/invalid-email": "That email address is invalid.",

  // Logging in
  "auth/wrong-password": "Wrong username or password.",
  "auth/user-not-found": "This email does not exist.",

  // Default
  default: "Something went wrong, try again!",
};

export const getError = (errorCode) => {
  console.log(errorCode);
  if (errors[errorCode]) {
    return errors[errorCode];
  } else {
    return errors["default"];
  }
};

export default {
  errors,
  getError,
};
