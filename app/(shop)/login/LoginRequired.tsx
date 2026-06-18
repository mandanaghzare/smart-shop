import Link from "next/link"

const LoginRequired = () => {
    return (
        <div className="min-h-screen bg-slate-100 px-8 py-12 transition-colors dark:bg-slate-950">
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Please login first
            </h1>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
                You need to be logged in to view this page.
            </p>

            <Link
                href="/login"
                className="
                mt-6 inline-block
                rounded-xl
                bg-slate-800
                px-6 py-3
                text-sm font-semibold
                text-slate-100
                transition
                hover:bg-slate-700
                dark:bg-slate-700
                dark:hover:bg-slate-600
                "
            >
                Go to Login
            </Link>
            </div>
        </div>
    );
}

export default LoginRequired