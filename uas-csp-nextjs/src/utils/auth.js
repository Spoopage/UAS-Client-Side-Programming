import { supabase } from "@/lib/supabaseClient"

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  // user: { id, email, ... } atau null jika belum login
  return data?.user || null
}

export async function logout(router) {
  await supabase.auth.signOut()
  if (router) {
    router.replace("/signin")
  }
}
