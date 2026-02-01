import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminAddProduct from "./pages/AdminAddProduct.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          }
        />

        <Route path="*" element={<h2 style={{ padding: 20 }}>Page Not Found</h2>} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
