import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
      <img
        src={product.imageUrl || "https://via.placeholder.com/600x450?text=Shoe"}
        alt={product.name}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />

      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px" }}>{product.name}</h3>
        <p style={{ margin: "0 0 10px" }}>Rs. {product.price}</p>

        <div style={{ display: "flex", gap: 10 }}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
            <button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" }}>
              View
            </button>
          </Link>

          <button
            onClick={() => onAddToCart(product)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #111", cursor: "pointer" }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
