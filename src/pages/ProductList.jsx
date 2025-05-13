import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function ProductList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">추천 제품</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="border rounded-lg p-4 hover:shadow">
            <img src={product.image} alt={product.name} className="h-40 object-cover w-full mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-blue-600 font-bold">{product.price.toLocaleString()}원</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
