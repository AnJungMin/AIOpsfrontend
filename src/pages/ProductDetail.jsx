// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p className="p-6 text-center text-red-500">제품을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg shadow" />

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700">{product.price.toLocaleString()}원</p>
          <p className="text-yellow-500">⭐ {product.rating} / 5.0</p>

          <div>
            <h3 className="font-semibold mb-2">추천 두피 유형</h3>
            <div className="flex flex-wrap gap-2">
              {product.scalpTypes.map((type, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 후기 */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">구매자 리뷰</h3>
        <div className="space-y-3">
          {product.reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl border">
              <p className="font-semibold">{review.user}</p>
              <p className="text-sm text-gray-500 mb-1">{review.type}</p>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
