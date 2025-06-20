"use client";
import { useState, useEffect } from "react";

export default function ProductForm({ editing, onDone }) {
  const [form, setForm] = useState({
    nama_produk: "",
    harga_satuan: "",
    quantity: ""
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ nama_produk: "", harga_satuan: "", quantity: "" });
  }, [editing]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nama_produk || !form.harga_satuan || !form.quantity) {
      alert("Semua field wajib diisi!");
      return;
    }
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:4000/products/${editing.id}`
      : "http://localhost:4000/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        harga_satuan: Number(form.harga_satuan),
        quantity: Number(form.quantity)
      }),
    });
    onDone();
    setForm({ nama_produk: "", harga_satuan: "", quantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded mt-4">
      <h3 className="font-semibold mb-2">{editing ? "Edit Produk" : "Tambah Produk"}</h3>
      <input
        name="nama_produk"
        placeholder="Nama Produk"
        className="border p-2 mr-2 mb-2 w-full"
        value={form.nama_produk}
        onChange={handleChange}
      />
      <input
        name="harga_satuan"
        placeholder="Harga Satuan"
        type="number"
        className="border p-2 mr-2 mb-2 w-full"
        value={form.harga_satuan}
        onChange={handleChange}
      />
      <input
        name="quantity"
        placeholder="Quantity"
        type="number"
        className="border p-2 mb-2 w-full"
        value={form.quantity}
        onChange={handleChange}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        {editing ? "Update" : "Tambah"}
      </button>
      {editing && (
        <button
          type="button"
          className="ml-2 px-4 py-2 rounded bg-gray-400 text-white"
          onClick={() => onDone()}
        >Batal</button>
      )}
    </form>
  );
}