
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const subtotal = useMemo(() => cart.reduce((sum, x) => sum + (Number(x.price) * x.qty), 0), [cart]);
  const shipping = 0; // Free
  const tax = subtotal * 0.05; // Example 5% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-12 animate-fade-in">
      <h1 className="text-3xl font-black mb-2 text-[#111418] dark:text-white">Shopping Cart</h1>
      <p className="text-[#617589] dark:text-gray-400 mb-8">{cart.length} items in your cart</p>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#f0f2f4] dark:bg-gray-800 rounded-xl">
          <p className="text-xl font-bold mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:brightness-110">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex gap-6 items-center">
                  <div className="w-32 h-32 bg-[#f0f2f4] dark:bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={item.imageUrl || "https://via.placeholder.com/200?text=No+Image"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-[#111418] dark:text-white">{item.name}</h3>
                        <p className="text-[#617589] dark:text-gray-400 text-sm">Size: {item.size || 'US 10'} | Qty: {item.qty}</p>
                      </div>
                      <span className="font-bold text-lg text-[#111418] dark:text-white">${Number(item.price).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center bg-[#f0f2f4] dark:bg-gray-800 rounded-lg">
                        <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg"> - </button>
                        <span className="px-3 text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg"> + </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm font-bold flex items-center gap-1 hover:text-red-700">
                        <span className="material-symbols-outlined text-lg">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-xl mb-6 text-[#111418] dark:text-white">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#617589] dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-[#111418] dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#617589] dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[#617589] dark:text-gray-400">
                  <span>Estimated Tax (5%)</span>
                  <span className="text-[#111418] dark:text-white font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 py-4 mb-6">
                <span className="font-bold text-lg text-[#111418] dark:text-white">Total</span>
                <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-[#617589] dark:text-gray-400 mb-2 block">Promo Code</span>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter code" className="flex-1 bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 py-2" />
                  <button className="bg-[#111418] dark:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Apply</button>
                </div>
              </div>

              <Link to="/checkout" className="group flex items-center justify-between w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:brightness-110 transition-all">
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>

              <div className="mt-6 flex items-center gap-2 text-xs text-[#617589] justify-center">
                <span className="material-symbols-outlined text-sm">lock</span> Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
