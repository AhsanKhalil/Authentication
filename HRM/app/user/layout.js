"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" }); // Call API to clear cookie
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between">
        <div>
          <div className="p-4 text-xl font-bold border-b border-gray-200">
            User Panel
          </div>
          <nav className="p-4 space-y-2">
            <Link
              href="/user/"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              href="/user/attendance"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Attendance
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
