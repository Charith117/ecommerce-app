import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [pin, setPin] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple verification for demo purposes
        if (pin === "1234") { // You can change this PIN
            sessionStorage.setItem("isAdmin", "true");
            navigate("/admin/add-product");
        } else {
            alert("Invalid Access PIN");
            setPin("");
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-[#f6f7f8] dark:bg-background-dark py-20 px-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg max-w-sm w-full border border-gray-100 dark:border-gray-800 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                </div>
                <h1 className="text-2xl font-black mb-2 text-[#111418] dark:text-white">Admin Access</h1>
                <p className="text-gray-500 text-sm mb-6">Restricted area. Please enter the PIN.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none text-center tracking-widest text-lg font-bold"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:brightness-110 transition-all">
                        Access Dashboard
                    </button>
                </form>

                <p className="mt-6 text-xs text-gray-400">
                    Demo PIN: 1234
                </p>
            </div>
        </div>
    );
}
