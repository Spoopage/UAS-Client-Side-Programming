"use client";
import { logout } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-blue-700 px-6 py-3 text-white mb-4 rounded">
      <div className="font-bold text-lg">Dashboard</div>
      <div>
        <span className="mr-4">Logged in as <b>{user.username}</b> ({user.role})</span>
        <button onClick={() => logout(router)} className="bg-blue-900 rounded px-3 py-1 hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}