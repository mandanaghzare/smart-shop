"use client"

import Link from "next/link"
import React, { useState } from "react"



const RegisterPage = () => {
const initialRegisterState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const [formValues, setFormValues] = useState(initialRegisterState )

const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log(formValues)
}

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Create account</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name..."
            value={formValues.fullName}
            onChange={(e) => setFormValues({...formValues, fullName: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <input
            type="email"
            placeholder="Email..."
            value={formValues.email}
            onChange={(e) => setFormValues({...formValues, email: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <input
            type="password"
            placeholder="Password..."
            value={formValues.password}
            onChange={(e) => setFormValues({...formValues, password: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <input
            type="password"
            placeholder="Confirm password..."
            value={formValues.confirmPassword}
            onChange={(e) => setFormValues({...formValues, confirmPassword: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <button
            type="button"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;