"use client";
import { useEffect, useState } from "react";

export default function ProductTable({ user, onEdit }) {
  const [products, setProducts] = useState([]);
  const isAdmin = user.role === "admin";

  const fetchProducts = () => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus produk ini?")) return;
    await fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-3 py-2">Nama Produk</th>
            <th className="px-3 py-2">Harga Satuan</th>
            <th className="px-3 py-2">Quantity</th>
            {isAdmin && <th className="px-3 py-2">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id} className="border-t">
              <td className="px-3 py-1">{prod.nama_produk}</td>
              <td className="px-3 py-1">Rp{prod.harga_satuan.toLocaleString()}</td>
              <td className="px-3 py-1">{prod.quantity}</td>
              {isAdmin && (
                <td className="px-3 py-1">
                  <button
                    onClick={() => onEdit(prod)}
                    className="bg-yellow-500 px-2 py-1 rounded mr-2 text-white"
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="bg-red-600 px-2 py-1 rounded text-white"
                  >Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}