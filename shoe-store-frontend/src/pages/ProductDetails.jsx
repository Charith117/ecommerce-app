
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(9);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.imageUrl || "https://via.placeholder.com/800x600?text=No+Image");
      })
      .catch((err) => {
        console.error("FAILED to fetch product details:", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
        alert(`Error: ${err.message}. Check console for details.`);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  const images = [
    mainImage,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqSylFMuXUbRw_-gU-tZewJxV0CuNq_DgM8NU6Jn3HQDtOaYGVI6joA0-LnMe2ZVjNhY8SfNAabhMo4loho6_fEsFM1bbjyA4FdxAEgrdBPz5otSebX4lDmMCGSzYXr6ATkjWjXIp6RJ9KirMBSU63lvWQ94v1zJP2fUlDyHUsEaREMEJltWiAjog7uqvYJlQMKFZZxAShbhUIYr-YNlF0UzY5Oie4YxhRtxPx5H5mZQGYyeBmHNgp8nHSV3Sg41Wsn9Swnnsf78",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA-sdDAcTxlIR4iYBbPwO6wzm_FAmT7SWsWlIPkR1vEX_CGcvUaAgpsNeqbPI3B6LVPyQHJ8We185NYysea6wD151X-Wccnq2sO4r9L77NPJW-VmcnW6xY2E-Ac86bYIs9aT9JrQPzSQRZPGOKl8wLnGhxvvoCSDN-Hei10m81pJuzwOdyoQ-jhJrY93GwqBNRjXXmPmrbopz3PZu8defLCPCTDXRT3A6xyVTzPQNZqNqAHg_gjA0ErFrHgG6dNb4Ik-kV2VRU0kRo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnYOU1ZMsuIGeFbpkW0h1VnItZhoueyGwBa_aLit7w8klYkEIpDJjHcQ2q5pDDx0QTnoZQupxE278f9oBDcCiamdo8RuWG8CC5WPricjnJefJX4hW6evvjsHl8o-avKyyuaWzTfSPqdMuFAnoRVk18KldmGCiUVUMf9eM8glfoU-yYKsokJgHsqv_O-i5VEfKUss1v7CBSfIubfjEMcxWpFO5Ed2tHArx1hyXLXUR951-kgfo6usO2ReBF3CaOprN3Mv2kkeO-MXY"
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-8 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="text-sm text-[#617589] dark:text-gray-400 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Men</span> / <span className="text-[#111418] dark:text-white font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="bg-[#f0f2f4] dark:bg-gray-800 rounded-xl p-8 mb-4 h-[500px] flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url("${mainImage}")` }}></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`bg-[#f0f2f4] dark:bg-gray-800 rounded-lg h-24 cursor-pointer border-2 transition-all overflow-hidden ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
              >
                <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("${img}")` }}></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="inline-block bg-[#e0f2fe] text-primary px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-4">New Arrival</span>
          <h1 className="text-3xl font-black mb-2 text-[#111418] dark:text-white">{product.name}</h1>
          <h2 className="text-xl text-[#617589] dark:text-gray-400 mb-4 font-normal">Performance Sneakers</h2>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              {'★'.repeat(5)} <span className="text-[#617589] dark:text-gray-400 ml-1 font-medium">4.8 (124 reviews)</span>
            </div>
          </div>

          <p className="text-[#617589] dark:text-gray-400 leading-relaxed mb-8">
            {product.description || "Designed for high-intensity training and daily runs. The UltraBounce Pro features our proprietary energy-return foam and a breathable mesh upper for maximum comfort during your longest sessions."}
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm text-[#111418] dark:text-white">Select Size (US)</span>
              <a href="#" className="text-primary text-sm font-bold">Size Guide</a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[7, 8, 9, 10, 11, 12, 13, 14].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg border text-sm font-bold transition-all ${selectedSize === size
                    ? 'border-primary text-primary bg-[#f0f9ff]'
                    : 'border-gray-200 dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:border-gray-400'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button onClick={() => addToCart({ ...product, size: selectedSize })} className="bg-primary text-white py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-primary/30">Add to Cart</button>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111418] dark:text-gray-200 py-4 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Add to Wishlist</button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#617589] dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">local_shipping</span> Free Express Shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">published_with_changes</span> 30-Day Free Returns
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
