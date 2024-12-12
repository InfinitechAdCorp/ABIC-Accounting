"use server";

export const login = async (formData: FormData) => {
  const response = { isLoggedIn: false };
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username == process.env.LOGIN_USERNAME &&
    password == process.env.LOGIN_PASSWORD
  ) {
    response.isLoggedIn = true;
  }

  return response;
};
