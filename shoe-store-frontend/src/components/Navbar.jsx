import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#f0f2f4] dark:border-gray-800 px-4 md:px-10 lg:px-40 py-3">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111418] dark:text-white text-xl font-black leading-tight tracking-tighter">LUXE STEP</h2>
          </Link>
          {/* <nav className="hidden md:flex items-center gap-8">
            <Link className="text-[#111418] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors" to="/">New Arrivals</Link>
            <Link className="text-[#111418] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors" to="/">Collections</Link>
            <Link className="text-[#111418] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors" to="/">Sale</Link>
          </nav> */}
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="hidden lg:flex flex-col min-w-40 h-10 max-w-64 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#f0f2f4] dark:bg-gray-800">
              <div className="text-[#617589] flex items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-[#617589] px-4 pl-2 text-sm font-normal" placeholder="Search brands..." defaultValue="" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
            <Link to="/cart" className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
