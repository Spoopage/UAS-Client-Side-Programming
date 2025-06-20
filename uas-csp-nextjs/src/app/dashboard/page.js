"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "../../utils/auth"
import Navbar from "../../components/Navbar"
import ProductTable from "../../components/ProductTable"
import ProductForm from "../../components/ProductForm"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const u = getCurrentUser()
    if (!u) router.replace("/signin")
    else setUser(u)
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream">
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-sage-dark to-sage-light px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Welcome back, {user.username}</h1>
            <p className="text-white/80 mt-2 text-sm sm:text-base">Manage your product inventory with ease</p>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Admin Form Section */}
            {user.role === "admin" && (
              <div className="mb-6 sm:mb-8">
                <ProductForm
                  editing={editing}
                  onDone={() => {
                    setEditing(null)
                    setRefresh((r) => !r)
                  }}
                />
              </div>
            )}

            {/* Products Section */}
            <div className="bg-sage-pale/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-sage-dark mb-4 sm:mb-6 flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="hidden sm:inline">Product Inventory</span>
                <span className="sm:hidden">Products</span>
              </h2>
              <ProductTable user={user} onEdit={(prod) => setEditing(prod)} key={refresh} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
