"use client"

import { useAuthStore } from "@/store/authStore";
import { FirebaseError } from "firebase/app";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";



const RegisterPage = () => {
  const initialRegisterState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialRegisterState)
  const [isLoading, setIsLoading] = useState(false);
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  

  const handleSubmit = async () => {

    if (
      !formValues.fullName ||
      !formValues.email ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formValues.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formValues.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      await register(
        formValues.fullName,
        formValues.email,
        formValues.password
      );

      toast.success("Account created successfully");

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("An account with this email already exists");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password is too weak");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };


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
              {isLoading ? "Creating account..." : "Create account"}
            </button>
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