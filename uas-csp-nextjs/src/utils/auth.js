export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
  return null
}

export function logout(router) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
  router.replace("/signin")
}
