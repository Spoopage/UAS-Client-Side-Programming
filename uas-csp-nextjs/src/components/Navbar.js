"use client"
import { logout } from "../utils/supabase/authSupabase"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";

export async function fetchUserProfile(email) {
  // ambil user dari table "users" by email
  const { data, error } = await supabase
    .from("users")
    .select("username, role")
    .eq("email", email)
    .single();

  if (error) return null;
  return data;
}

export default function Navbar({ user }) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profile, setProfile] = useState({ username: "", role: "" })

  // fetch username & role dari table users
  useEffect(() => {
    async function getProfile() {
      if (!user?.email) return;
      const data = await fetchUserProfile(user.email)
      if (data) setProfile(data)
    }
    getProfile()
  }, [user])

  return (
    <nav className="bg-white shadow-lg border-b border-sage-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-sage-dark to-sage-light rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-sage-dark">EcoMart</h1>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sage-light rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-medium text-sage-dark">{profile.userName || user.email}</p>
                <p className="text-sage-light capitalize">{profile.role || "user"}</p>
              </div>
            </div>

            <button
              onClick={() => logout(router)}
              className="bg-sage-dark hover:bg-sage-dark/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sage-dark hover:text-sage-dark/80 focus:outline-none focus:text-sage-dark/80"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sage-light">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-sage-light rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-sage-dark">{userName}</p>
                  <p className="text-sage-light capitalize">{userRole}</p>
                </div>
              </div>
              <button
                onClick={() => logout(router)}
                className="w-full text-left bg-sage-dark hover:bg-sage-dark/90 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
