import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function AdminManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: "",
        imageUrl: "",
        description: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/api/products");
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch products");
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product.id);
        setFormData({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrl || "",
            description: product.description || "",
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Attempting update for ID:", editingProduct);
        if (!editingProduct) {
            alert("Error: No product ID selected for update");
            return;
        }

        try {
            const url = `/api/products/${editingProduct}`;
            console.log("PUT Request to:", url);

            await api.put(url, {
                name: formData.name,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                imageUrl: formData.imageUrl,
                description: formData.description,
            });
            alert("Product updated successfully!");
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.error("Update failed:", err);
            const msg = err.response?.data?.message || err.message || "Unknown error";
            alert(`Failed to update product (ID: ${editingProduct}): ${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/api/products/${id}`);
            alert("Product deleted successfully!");
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Failed to delete product");
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            price: "",
            quantity: "",
            imageUrl: "",
            description: "",
        });
    };

    return (
        <div className="flex min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 hidden lg:block p-6">
                <div className="font-black text-xl mb-8 flex items-center gap-2 text-[#111418] dark:text-white">
                    <div className="w-6 h-6 bg-primary rounded-lg"></div>
                    ShoeStore Admin
                </div>

                <nav className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-primary font-bold rounded-lg pointer-events-none">
                        Manage Products
                    </a>
                    <a href="/admin/add-product" className="flex items-center gap-3 px-4 py-3 text-[#617589] rounded-lg hover:bg-[#f6f7f8] font-medium">
                        Add Product
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black mb-2 text-[#111418] dark:text-white">
                                Manage Products
                            </h1>
                            <p className="text-[#617589]">View, edit, and delete products from your inventory</p>
                        </div>
                        <a
                            href="/admin/add-product"
                            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                        >
                            + Add New Product
                        </a>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-[#617589]">Loading products...</div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f6f7f8] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-[#617589] uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-[#617589] uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-[#617589] uppercase tracking-wider">
                                                Stock
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-[#617589] uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-[#f6f7f8] dark:hover:bg-gray-800 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={product.imageUrl || "https://via.placeholder.com/60"}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div>
                                                            <div className="font-bold text-[#111418] dark:text-white">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-[#617589] line-clamp-1">
                                                                {product.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-[#111418] dark:text-white">
                                                        ${product.price.toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.quantity > 10
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.quantity > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.quantity} units
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="bg-blue-50 text-primary font-bold py-2 px-4 rounded-lg hover:bg-blue-100 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="bg-red-50 text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-100 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {products.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-[#617589] mb-4">No products found</div>
                                    <a
                                        href="/admin/add-product"
                                        className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Add Your First Product
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Edit Modal */}
                    {editingProduct && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                                <h2 className="text-2xl font-black mb-6 text-[#111418] dark:text-white">
                                    Edit Product
                                </h2>

                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Price ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Stock Quantity</label>
                                            <input
                                                type="number"
                                                value={formData.quantity}
                                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                                        />
                                        {formData.imageUrl && (
                                            <img
                                                src={formData.imageUrl}
                                                alt="Preview"
                                                className="mt-3 h-32 object-cover rounded-lg"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none h-32 resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-white border border-gray-200 font-bold py-3 px-6 rounded-lg text-[#111418] hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Update Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
