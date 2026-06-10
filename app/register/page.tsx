"use client"

import Link from "next/link"
import { useState } from "react"



const RegisterPage = () => {
  const initialRegisterState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialRegisterState)
  const [message, setMessage] = useState("")

  
  const fakeUsers = [
    {
      email: "test@gmail.com",
      password: "12345678",
    },
  ]

  const handleSubmit = () => {
    if (!formValues.fullName || !formValues.email || !formValues.password || !formValues.confirmPassword) {
      setMessage("Fill the field")
      return
    }
    if (formValues.password !== formValues.confirmPassword) {
      setMessage("Password is not correct")
      return
    }
    if(fakeUsers.find((user) => user.email === formValues.email)){
      setMessage("An account with this email already exists")
      return
    }
    setMessage("Success")
  }


    return (
      <div className="min-h-screen bg-slate-100 px-6 py-12 transition-colors dark:bg-slate-950">
        <div
          className="
            mx-auto max-w-md
            rounded-2xl
            border border-slate-200
            bg-slate-50
            p-8
            shadow-sm
            transition-colors
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Create account
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mt-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Full name..."
              value={formValues.fullName}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  fullName: e.target.value,
                })
              }
              className="
                w-full rounded-lg
                border border-slate-300
                bg-slate-50
                px-4 py-3
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-slate-900

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />

            <input
              type="email"
              placeholder="Email..."
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  email: e.target.value,
                })
              }
              className="
                w-full rounded-lg
                border border-slate-300
                bg-slate-50
                px-4 py-3
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-slate-900

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />

            <input
              type="password"
              placeholder="Password..."
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  password: e.target.value,
                })
              }
              className="
                w-full rounded-lg
                border border-slate-300
                bg-slate-50
                px-4 py-3
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-slate-900

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />

            <input
              type="password"
              placeholder="Confirm password..."
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  confirmPassword: e.target.value,
                })
              }
              className="
                w-full rounded-lg
                border border-slate-300
                bg-slate-50
                px-4 py-3
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-slate-900

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />

            <button
              type="submit"
              className="
                w-full rounded-xl
                bg-slate-800
                py-3
                text-sm font-semibold
                text-slate-100
                transition
                hover:bg-slate-700

                dark:bg-slate-700
                dark:hover:bg-slate-600
              "
            >
              Create account
            </button>

            {message && (
              <p className="text-sm text-red-500">
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-slate-900 dark:text-slate-100"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  };

export default RegisterPage;