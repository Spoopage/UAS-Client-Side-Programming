"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient";

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
    e.preventDefault();
    if (!form.nama_produk || !form.harga_satuan || !form.quantity) {
      alert("All fields are required!");
      return;
    }
    // Konversi angka
    const data = {
      ...form,
      harga_satuan: Number(form.harga_satuan),
      quantity: Number(form.quantity),
    };
    let result, error;
    if (editing) {
      // UPDATE
      ({ error } = await supabase
        .from("products")
        .update(data)
        .eq("id", editing.id)
      );
    } else {
      // CREATE
      ({ error } = await supabase
        .from("products")
        .insert([data])
      );
    }
    if (error) {
      alert("Failed to save product!");
      return;
    }
    onDone();
    setForm({ nama_produk: "", harga_satuan: "", quantity: "" });
  };


  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-sage-light/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sage-light to-sage-pale px-4 sm:px-6 py-3 sm:py-4">
        <h3 className="text-base sm:text-lg font-semibold text-sage-dark flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <span className="hidden sm:inline">{editing ? "Edit Product" : "Add New Product"}</span>
          <span className="sm:hidden">{editing ? "Edit" : "Add Product"}</span>
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-sage-dark mb-2">Product Name</label>
            <input
              name="nama_produk"
              placeholder="Enter product name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              value={form.nama_produk}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-dark mb-2">
              <span className="hidden sm:inline">Unit Price (Rp)</span>
              <span className="sm:hidden">Price (Rp)</span>
            </label>
            <input
              name="harga_satuan"
              placeholder="0"
              type="number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-sage-light rounded-lg focus:ring-2 focus:ring-sage-dark focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-gradient-to-r from-sage-dark to-sage-light text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            type="submit"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden sm:inline">{editing ? "Update Product" : "Add Product"}</span>
            <span className="sm:hidden">{editing ? "Update" : "Add"}</span>
          </button>

          {editing && (
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
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
