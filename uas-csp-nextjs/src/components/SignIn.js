"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient";
import { setegid } from "process";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Gunakan login Supabase Auth (email)
    const { data:{user}, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      router.replace("/dashboard");
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-pale to-cream flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-sage-dark to-sage-light px-6 sm:px-8 py-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-sage-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">EcoMart</h1>
            <p className="text-white/80 text-sm sm:text-base">Product Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-sage-dark mb-6 text-center">Sign In</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                {/* <label className="block text-sm font-medium text-sage-dark mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                /> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-dark mb-2">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-dark mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-sage-dark to-sage-light text-white rounded-lg py-3 font-semibold mt-6 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
