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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
      <Link
        className="bg-blue-500 text-white p-2 rounded float-right"
        href="/admin/employees"
      >
        View All
      </Link>

      <form onSubmit={handleSubmit(saveEmp)}>
        <div className="mt-2">
          <label>Name: </label>
          <input
            {...register("name")}
            className="border p-1"
            placeholder="e.g Ali Bin Ejaz"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mt-2">
          <label>Email: </label>
          <input
            {...register("email")}
            className="border p-1"
            placeholder="e.g abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label>Designation: </label>
          <input
            {...register("designation")}
            className="border p-1"
            placeholder="e.g Faculty"
          />
          {errors.designation && (
            <p className="text-red-500">{errors.designation.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label>Salary: </label>
          <input
            {...register("salary")}
            className="border p-1"
            placeholder="e.g Faculty"
          />
          {errors.salary && (
            <p className="text-red-500">{errors.salary.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label>Password: </label>
          <input
            {...register("password")}
            className="border p-1"
            placeholder="e.g Faculty"
          />
        </div>
        <div className="mt-2">
          <label>Joining Date: </label>
          <input
            {...register("joiningDate")}
            className="border p-1"
            placeholder="e.g Faculty"
          />
        </div>
        <div className="mt-2">
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}