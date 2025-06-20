"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }
    const res = await fetch(`http://localhost:4000/users?username=${username}&password=${password}`);
    const users = await res.json();
    if (users.length > 0) {
      localStorage.setItem("user", JSON.stringify(users[0]));
      router.replace("/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow w-full max-w-xs">
        <h2 className="font-bold text-2xl mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="mb-2 w-full p-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700" type="submit">Login</button>
      </form>
    </div>
  );
}