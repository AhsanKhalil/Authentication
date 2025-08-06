"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

export default function AddEmployee() {
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    designation: yup.string().required(),
    salary: yup.number().required("Salary is required"),
    joiningDate: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const saveEmp = async (data) => {
    const res = await fetch("/api/employee", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      Swal.fire({
        title: "Done",
        text: "Employee Added Successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Employee Not Saved!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex justify-center items-start">
      <div className="bg-white dark:bg-gray-950 shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Add New Employee
          </h1>
          <Link
            href="/admin/employees"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            View All
          </Link>
        </div>

        <form onSubmit={handleSubmit(saveEmp)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Enter you name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Designation
            </label>
            <input
              {...register("designation")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Enter Faculty"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Salary
            </label>
            <input
              {...register("salary")}
              type="number"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Enter Salary"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Enter Password"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Joining Date
            </label>
            <input
              {...register("joiningDate")}
              type="date"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
            >
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
