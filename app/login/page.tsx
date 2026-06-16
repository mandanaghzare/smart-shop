"use client"
import { useAuthStore } from "@/store/authStore";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LoginPage = () => {
    const initialLoginState = {
        email: '',
        password: ''
    }
    const [loginForm, setLoginForm] = useState(initialLoginState)
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")
    const login = useAuthStore((state) => state.login)
    const router = useRouter()

    const fakeUsers = [
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    ]

    const handleSubmit = async () => {
      setMessage("");

      if (!loginForm.email || !loginForm.password) {
        setMessage("Please fill in all fields");
        return;
      }

      if (!loginForm.email.includes("@")) {
        setMessage("Please enter a valid email address");
        return;
      }

      if (loginForm.password.length < 8) {
        setMessage("Password must be at least 8 characters");
        return;
      }

      try {
        setIsLoading(true);

        await login(loginForm.email, loginForm.password);

        setMessage("Login successful");

        setTimeout(() => {
          router.push("/");
        }, 500);
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/user-not-found") {
            setMessage("No account found with this email");
          } else if (error.code === "auth/wrong-password") {
            setMessage("Incorrect password");
          } else if (error.code === "auth/invalid-credential") {
            setMessage("Invalid email or password");
          } else {
            setMessage("Login failed. Please try again.");
          }
        } else {
          setMessage("Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Login
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Enter your email..."
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({
                ...loginForm,
                email: e.target.value,
              })
            }
            className="
              w-full rounded-lg
              border border-slate-300
              bg-slate-100
              px-4 py-3
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-slate-700
              focus:ring-2
              focus:ring-slate-300
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          />

          <input
            type="password"
            placeholder="Password..."
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({
                ...loginForm,
                password: e.target.value,
              })
            }
            className="
              w-full rounded-lg
              border border-slate-300
              bg-slate-100
              px-4 py-3
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-slate-700
              focus:ring-2
              focus:ring-slate-300
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          />

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-xl
              bg-slate-800
              py-3
              text-sm font-semibold
              text-slate-100
              transition
              hover:bg-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:bg-slate-700
              dark:hover:bg-slate-600
            "
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-sm text-green-600 dark:text-green-400">
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-slate-900 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;