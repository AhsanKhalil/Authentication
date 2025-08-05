"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

export default function Home() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
         
          document.cookie = `token=${data.token}; path=/`;

          if(data.role === "admin"){
            router.push("/admin");
          }
          else{
            router.push("/user");
          }

          
        } else {
          setMsg("Token Not Found");
        }
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      // console.log("API not working", error);
    }
  };

  return (
    <>
      <div className="p-6 max-w-sm mx-auto flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Login - HR Management</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{msg}</p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </>
  );
}