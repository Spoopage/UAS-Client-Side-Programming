"use client"
import { useEffect, useState } from "react"

export default function ProductTable({ user, onEdit }) {
  const [products, setProducts] = useState([])
  const isAdmin = user.role === "admin"

  const fetchProducts = () => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then(setProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    await fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" })
    fetchProducts()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <svg className="w-16 h-16 text-sage-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h3 className="text-lg font-medium text-sage-dark mb-2">No products found</h3>
        <p className="text-sage-light">Start by adding your first product to the inventory.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sage-light/30">
          <thead className="bg-sage-pale/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sage-dark uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sage-dark uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sage-dark uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sage-dark uppercase tracking-wider">
                Total Value
              </th>
              {isAdmin && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-sage-dark uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-light/20">
            {products.map((prod, index) => (
              <tr
                key={prod.id}
                className={`hover:bg-sage-pale/10 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-sage-pale/5"}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-sage-light to-sage-pale rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{prod.nama_produk}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-sage-dark">{formatPrice(prod.harga_satuan)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      prod.quantity > 10
                        ? "bg-green-100 text-green-800"
                        : prod.quantity > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {prod.quantity} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatPrice(prod.harga_satuan * prod.quantity)}
                  </div>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(prod)}
                        className="bg-sage-light hover:bg-sage-dark text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-sage-pale/20 px-6 py-4 border-t border-sage-light/30">
        <div className="flex justify-between items-center text-sm">
          <span className="text-sage-dark">
            Total Products: <span className="font-semibold">{products.length}</span>
          </span>
          <span className="text-sage-dark">
            Total Inventory Value:{" "}
            <span className="font-semibold">
              {formatPrice(products.reduce((sum, prod) => sum + prod.harga_satuan * prod.quantity, 0))}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
