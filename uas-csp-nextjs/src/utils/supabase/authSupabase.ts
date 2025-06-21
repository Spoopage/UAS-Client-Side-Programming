import { supabase } from "@/lib/supabaseClient"
import type { NextRouter } from "next/router" 

type RouterLike = { replace: (path: string) => void }

// Dapatkan user dari Supabase Auth
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data?.user || null
}

// Logout dari Supabase Auth
export async function logout(router?: RouterLike) {
  await supabase.auth.signOut()
  if (router) {
    localStorage.removeItem('user');
    router.replace("/signin")
  }
}
