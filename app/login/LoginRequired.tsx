import Link from "next/link"

const LoginRequired = () => {
    return(
        <div className="min-h-screen bg-gray-50 px-8 py-12">
                <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    Please login first
                </h1>

                <p className="mt-3 text-gray-500">
                    You need to be logged in to view your wishlist.
                </p>

                <Link
                    href="/login"
                    className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                    Go to Login
                </Link>
                </div>
            </div>
    )
}

export default LoginRequired