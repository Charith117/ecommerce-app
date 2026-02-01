
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const [customerName, setCustomerName] = useState("");
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(() => cart.reduce((sum, x) => sum + (Number(x.price) * x.qty), 0), [cart]);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const placeOrder = async () => {
    if (!customerName.trim()) return alert("Enter customer name");
    if (cart.length === 0) return alert("Cart is empty");

    try {
      const res = await api.post("/api/orders", {
        customerName,
        total,
        // You can also send the list of items if your backend supports it
      });

      clearCart();

      alert(`Order placed! Order ID: ${res.data.id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to place order. Check backend.");
    }
  };


  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-12 animate-fade-in text-left">
      {/* Header / Stepper simplified */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-400">
          <div className="flex items-center gap-2 text-primary">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
            <span>Shipping</span>
          </div>
          <div className="h-0.5 w-12 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs">2</span>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-12 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs">3</span>
            <span>Review</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Shipping Information</h1>
      <p className="text-[#617589] mb-8">Where should we send your new footwear?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Forms */}
        <div className="md:col-span-2">

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Customer Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Street Address</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" defaultValue="123 Shoe Lane" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-2">City</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" defaultValue="New York" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Postal Code</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" defaultValue="10001" />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" defaultValue="+1 (555) 000-0000" />
          </div>

          <h2 className="font-bold text-xl mb-4">Shipping Method</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="flex items-center justify-between p-4 bg-blue-50 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <input type="radio" checked readOnly className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-bold text-sm">Standard Delivery</div>
                  <div className="text-xs text-gray-500">3-5 Business Days</div>
                </div>
              </div>
              <span className="font-bold text-primary font-sm">Free</span>
            </div>
          </div>

          <h2 className="font-bold text-xl mb-4">Payment Method</h2>
          {/* Simplified payment UI */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white mb-8">
            <div className="flex gap-4 mb-6">
              <div className="border border-primary bg-blue-50 text-primary px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">credit_card</span> Credit Card
              </div>
              <div className="border border-gray-200 text-gray-500 px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">account_balance_wallet</span> Digital Wallet
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Cardholder Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" defaultValue={customerName} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Card Number</label>
              <div className="relative">
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="0000 0000 0000 0000" />
                <span className="absolute right-3 top-3 text-gray-400 material-symbols-outlined">lock</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Expiry Date</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">CVV</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="123" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link to="/cart" className="font-bold text-[#617589] hover:text-primary">Back to Cart</Link>
            <button onClick={placeOrder} className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:brightness-110 transition-all">Complete Purchase</button>
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.imageUrl || "https://via.placeholder.com/200?text=No+Image"} className="w-16 h-16 rounded-lg bg-gray-100 object-cover" />
                  <div>
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="font-medium text-xs text-[#617589]">Qty: {item.qty}</div>
                    <div className="font-medium">${Number(item.price).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4 mb-4 text-sm">
              <div className="flex justify-between text-[#617589]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[#617589]"><span>Shipping</span><span className="text-green-500">Free</span></div>
              <div className="flex justify-between text-[#617589]"><span>Estimated Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>

            <div className="flex justify-between font-bold text-xl border-t border-gray-100 pt-4 mb-6">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800">
              <strong>Shop with Confidence</strong><br />
              Your data is encrypted and protected by industry-leading security protocols.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
