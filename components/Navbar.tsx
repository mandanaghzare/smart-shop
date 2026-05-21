import Link from "next/link";


const Navbar = () => {
    return(
        <nav className="border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                    Smart Shop
                </Link>
                <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    <li>
                        <Link href="/" className="transition hover:text-gray-950">Home</Link>
                    </li>
                    <li>
                        <Link href="/products" className="transition hover:text-gray-950">Products</Link>
                    </li>
                    <li>
                        <Link href="/cart" className="transition hover:text-gray-950">Cart</Link>
                    </li>
                    <li>
                        <Link href="/login" className="transition hover:text-gray-950">Login</Link>
                    </li>
                </ul>                
            </div>
        </nav>
    )
}

export default Navbar;