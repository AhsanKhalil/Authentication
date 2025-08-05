"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Employee() {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    fetch("/api/employee")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmps(data);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">List Employee</h1>
      <Link
        className="bg-blue-500 text-white p-2 rounded float-right"
        href="/admin/employees/add"
      >
        + Add New
      </Link>
      <table className="border p-2">
        <tbody>
          {emps.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.userId.name}</td>
                <td>{e.userId.email}</td>
                <td>{e.designation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}