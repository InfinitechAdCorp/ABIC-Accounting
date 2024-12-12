"use server";

export const login = async (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username == process.env.LOGIN_USERNAME &&
    password == process.env.LOGIN_PASSWORD
  ) {
    return { isLoggedIn: true };
  }

  return { isLoggedIn: false };
};
