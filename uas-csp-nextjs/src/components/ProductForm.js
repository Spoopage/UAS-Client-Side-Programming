"use client"
import { useState, useEffect } from "react"

export default function ProductForm({ editing, onDone }) {
  const [form, setForm] = useState({
    nama_produk: "",
    harga_satuan: "",
    quantity: "",
  })

  useEffect(() => {
    if (editing) setForm(editing)
    else setForm({ nama_produk: "", harga_satuan: "", quantity: "" })
  }, [editing])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nama_produk || !form.harga_satuan || !form.quantity) {
      alert("All fields are required!")
      return
    }
    const method = editing ? "PUT" : "POST"
    const url = editing ? `http://localhost:4000/products/${editing.id}` : "http://localhost:4000/products"
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        harga_satuan: Number(form.harga_satuan),
        quantity: Number(form.quantity),
      }),
    })
    onDone()
    setForm({ nama_produk: "", harga_satuan: "", quantity: "" })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-sage-light/30 overflow-hidden">
      <div className="bg-gradient-to-r from-sage-light to-sage-pale px-6 py-4">
        <h3 className="text-lg font-semibold text-sage-dark flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                editing
                  ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  : "M12 6v6m0 0v6m0-6h6m-6 0H6"
              }
            />
          </svg>
          {editing ? "Edit Product" : "Add New Product"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-sage-dark mb-2">Product Name</label>
            <input
              name="nama_produk"
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200"
              value={form.nama_produk}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-dark mb-2">Unit Price (Rp)</label>
            <input
              name="harga_satuan"
              placeholder="0"
              type="number"
              className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200"
              value={form.harga_satuan}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-dark mb-2">Quantity</label>
            <input
              name="quantity"
              placeholder="0"
              type="number"
              className="w-full px-4 py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-gradient-to-r from-sage-dark to-sage-light text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            type="submit"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {editing ? "Update Product" : "Add Product"}
          </button>

          {editing && (
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              onClick={() => onDone()}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
