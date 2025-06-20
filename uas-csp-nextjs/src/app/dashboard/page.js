"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../../utils/auth";
import Navbar from "../../components/Navbar";
import ProductTable from "../../components/ProductTable";
import ProductForm from "../../components/ProductForm";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) router.replace("/signin");
    else setUser(u);
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Navbar user={user} />
      <h2 className="text-xl font-bold mb-4">Welcome, {user.username}</h2>
      {user.role === "admin" && (
        <ProductForm
          editing={editing}
          onDone={() => { setEditing(null); setRefresh(r => !r); }}
        />
      )}
      <ProductTable
        user={user}
        onEdit={prod => setEditing(prod)}
        key={refresh}
      />
    </div>
  );
}