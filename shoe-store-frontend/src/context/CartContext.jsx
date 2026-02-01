import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            return [];
        }
    });

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((x) => x.id === product.id);
            if (existing) {
                return prev.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                return [...prev, { ...product, qty: 1 }];
            }
        });

        showNotification(`Added ${product.name} to cart!`);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((x) => x.id !== id));
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                cartCount,
                notification,
            }}
        >
            {children}
            {/* Global Notification Toast */}
            {notification && (
                <div className="fixed bottom-5 right-5 bg-primary text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-50 flex items-center gap-2">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span className="font-bold">{notification}</span>
                </div>
            )}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
