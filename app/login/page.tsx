"use client"
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LoginPage = () => {
    const initialLoginState = {
        email: '',
        password: ''
    }
    const [loginForm, setLoginForm] = useState(initialLoginState)
    const [message, setMessage] = useState("")
    const login = useAuthStore((state) => state.login)
    const router = useRouter()

    const fakeUsers = [
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    ]

    const handleSubmit = () => {
      if (!loginForm.email || !loginForm.password) {
        setMessage("Please fill in all fields")
        return
      }

      if (!loginForm.email.includes("@")) {
        setMessage("Please enter a valid email address")
        return
      }

      if (loginForm.password.length < 8) {
        setMessage("Password must be at least 8 characters")
        return
      }

      const user = fakeUsers.find((user) => user.email === loginForm.email)

      if (!user) {
        setMessage("No account found with this email")
        return
      }

      if (user.password !== loginForm.password) {
        setMessage("Incorrect password")
        return
      }

      setMessage("Login successful")
      login(loginForm.email)
      setMessage("Login successful")
      setTimeout(() => {
        router.push("/")
      }, 800)
    }


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>

        <form onSubmit={((e) => { e.preventDefault(); handleSubmit() })} className="mt-6 space-y-4">
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
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </form>

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