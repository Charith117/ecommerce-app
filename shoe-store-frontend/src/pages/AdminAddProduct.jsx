
import { useState } from "react";
import { api } from "../api/api";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Enter name");
    if (!price) return alert("Enter price");

    try {
      await api.post("/api/products", {
        name,
        price: Number(price),
        quantity: Number(quantity || 0),
        imageUrl,
        description,
      });

      alert("Product added!");
      setName(""); setPrice(""); setQuantity(""); setImageUrl(""); setDescription("");
    } catch (err) {
      console.log(err);
      alert("Failed to add product. Check backend / fields.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
      {/* Sidebar simplified */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 hidden lg:block p-6">
        <div className="font-black text-xl mb-8 flex items-center gap-2 text-[#111418] dark:text-white">
          <div className="w-6 h-6 bg-primary rounded-lg"></div>
          ShoeStore Admin
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#617589] rounded-lg hover:bg-[#f6f7f8] font-medium">Dashboard</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-primary font-bold rounded-lg pointer-events-none">Inventory</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#617589] rounded-lg hover:bg-[#f6f7f8] font-medium">Orders</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#617589] rounded-lg hover:bg-[#f6f7f8] font-medium">Customers</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#617589] rounded-lg hover:bg-[#f6f7f8] font-medium">Analytics</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#617589] mb-4">
            <span>Inventory</span> / <span>Add Product</span>
          </div>

          <h1 className="text-3xl font-black mb-2 text-[#111418] dark:text-white">Add New Product</h1>
          <p className="text-[#617589] mb-8">Create a new shoe listing for your online store.</p>

          <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column Forms */}
            <div className="lg:col-span-2 space-y-6">

              {/* General Info */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-6 text-[#111418] dark:text-white">General Information</h2>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Product Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Nike Air Max Pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Brand</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none bg-white">
                      <option>Nike</option>
                      <option>Adidas</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none bg-white">
                      <option>Running</option>
                      <option>Formal</option>
                      <option>Lifestyle</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-6 text-[#111418] dark:text-white">Product Description</h2>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none h-32 resize-none" placeholder="Describe the material, fit, and unique features of the shoe..."></textarea>
              </div>

              {/* Inventory & Pricing */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-6 text-[#111418] dark:text-white">Inventory & Pricing</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Price ($)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Stock Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. 100" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column Images/Status */}
            <div className="space-y-6">
              {/* Images */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-4 text-[#111418] dark:text-white">Product Images</h2>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Product Image</label>

                  {/* File Upload */}
                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("file", file);

                        try {
                          const res = await api.post("/api/files/upload", formData);
                          setImageUrl(res.data); // Backend returns the URL string directly
                        } catch (err) {
                          console.error("Upload Error Details:", err);
                          if (err.response) {
                            alert(`Upload failed: ${err.response.status} ${err.response.statusText}\n${JSON.stringify(err.response.data)}`);
                          } else {
                            alert(`Upload failed: ${err.message}. Is the backend running?`);
                          }
                        }
                      }}
                      className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-primary
                          hover:file:bg-blue-100"
                    />
                  </div>

                  <div className="text-center text-xs text-gray-400 mb-2">- OR -</div>

                  <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="Enter Image URL directly..." />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-[#f6f7f8] mb-4">
                  <div className="text-4xl text-blue-300 mb-2">☁️</div>
                  {imageUrl ?
                    <img src={imageUrl} className="h-24 mx-auto object-cover rounded" /> :
                    <div className="font-medium text-sm text-[#617589]">Preview will appear here</div>
                  }
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-4 text-[#111418] dark:text-white">Attributes</h2>
                <div className="mb-4">
                  <label className="block text-xs uppercase text-[#617589] font-bold mb-2">Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {['US 7', 'US 8', 'US 9', 'US 10'].map(s => (
                      <span key={s} className="px-2 py-1 border rounded text-xs font-bold bg-[#f6f7f8] text-[#111418]">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-xs uppercase text-[#617589] font-bold mb-2">Status</label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-[#111418] dark:text-white">Published</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex justify-end gap-4 mt-4 pb-12">
              <button type="button" className="bg-white border border-gray-200 font-bold py-3 px-6 rounded-lg text-[#111418]">Cancel</button>
              <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-lg">Save Product</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
