"use client"
import Link from "next/link";
import { useState } from "react";


const LoginPage = () => {
    const initialLoginState = {
        email: '',
        password: ''
    }
    const [loginForm, setLoginForm] = useState(initialLoginState)
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email..."
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <input
            type="password"
            placeholder="Password..."
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <button
            type="button"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-900">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;