// app/admin/layout.js (for Next.js App Router)
// or src/components/AdminLayout.js (for plain React)

import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 text-xl font-bold border-b border-gray-200">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin/" className="block px-4 py-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>
          <Link href="/admin/employees" className="block px-4 py-2 rounded hover:bg-gray-200">
            Employees
          </Link>
          <Link href="/user/attendance" className="block px-4 py-2 rounded hover:bg-gray-200">
            Attendance
          </Link>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}