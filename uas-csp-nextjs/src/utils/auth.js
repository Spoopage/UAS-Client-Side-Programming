export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function logout(router) {
  localStorage.removeItem("user");
  router.replace("/signin");
}