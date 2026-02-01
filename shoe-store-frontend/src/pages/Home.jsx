
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const loadProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      setProducts([]); // Or handle error state appropriately
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 pb-20">
      {/* Hero Section */}
      <section className="mt-8">
        <div className="@container">
          <div className="flex flex-col gap-6 py-10 @[864px]:flex-row @[864px]:items-center">
            <div className="w-full bg-center bg-no-repeat aspect-[16/9] bg-cover rounded-xl @[864px]:w-1/2 shadow-2xl" data-alt="Hero Image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOqZ_NwJLm6dWlGinW_-nMhzMme6CvefLaPv953SJfC_2mTVgq7dh-R1yvGWkLN4TdSosZQI2Inr1jp1RDMCH_b5z8xT7PXIlrh8WFpGDGoTrj99T96378j9Wa0kQdCTAzXmV6XLnkYovEegB4qahn9iEugP2ehbmY_pu1jCI8LNsMHZxJaBTO3AyhO316Lv6kDQazbQ_TjmlXVKkX_JJwOJtjB6XUNgpDWcP9cIZYUAvWxu_KwHqUOEaTBUIeG_61RPzl_ho_pgw")' }}>
            </div>
            <div className="flex flex-col gap-6 @[864px]:w-1/2 @[864px]:pl-10">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Limited Edition Release</span>
                <h1 className="text-[#111418] dark:text-white text-5xl md:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
                  Step into Excellence
                </h1>
                <p className="text-[#617589] dark:text-gray-400 text-lg font-normal max-w-md">
                  Experience the pinnacle of comfort and style with our new seasonal collection crafted for the modern urbanite.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-transform hover:scale-105">
                  Shop Collection
                </button>
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white dark:bg-gray-800 border border-[#f0f2f4] dark:border-gray-700 text-[#111418] dark:text-white text-base font-bold transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mt-12 mb-8 border-y border-gray-100 dark:border-gray-800 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {['All Shoes', 'Running', 'Lifestyle', 'Formal'].map((filter, i) => (
            <button key={filter} className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 ${i === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:border-primary transition-colors'}`}>
              <span className="text-sm font-bold">{filter}</span>
              {i !== 0 && <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#617589] dark:text-gray-400">
          <span>Sort by:</span>
          <button className="text-[#111418] dark:text-white flex items-center gap-1">
            Featured <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </section>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="group flex flex-col gap-4 relative">
              <div className="relative w-full aspect-square bg-[#f0f2f4] dark:bg-gray-800 rounded-xl overflow-hidden">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${product.imageUrl || 'https://via.placeholder.com/400?text=No+Image'}")` }}
                  ></div>
                </Link>

                {product.tag && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm pointer-events-none ${product.tag === 'HOT' ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-900 text-[#111418] dark:text-white'}`}>
                    {product.tag}
                  </div>
                )}

                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white dark:bg-gray-900 text-[#111418] dark:text-white py-3 rounded-lg font-bold text-sm shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 z-10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  Add to Cart
                </button>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#617589] dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">{product.brand || "Brand"}</p>
                    <Link to={`/product/${product.id}`} className="text-[#111418] dark:text-white text-base font-bold leading-tight group-hover:text-primary transition-colors block">
                      {product.name}
                    </Link>
                  </div>
                  <p className="text-primary text-base font-bold">${Number(product.price).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Newsletter */}
      <section className="mt-24 bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-black mb-4">Stay ahead of the curve</h2>
        <p className="text-[#617589] dark:text-gray-400 mb-8 max-w-lg mx-auto">Get early access to drops, exclusive collaborations, and seasonal styling guides delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input className="flex-1 px-4 py-3 rounded-lg bg-background-light dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none" placeholder="Enter your email" type="email" />
          <button className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:brightness-110 transition-all">Subscribe</button>
        </div>
      </section>
    </main>
  );
}
