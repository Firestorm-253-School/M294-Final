export const logout = () => {
  localStorage.removeItem("auth_token");
  return true;
};
