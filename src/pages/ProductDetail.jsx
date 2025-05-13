// ProductDetail.jsx
import { useParams } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>제품을 찾을 수 없습니다.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 이미지 */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl shadow-md object-cover"
        />

        {/* 정보 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="text-yellow-500 text-sm">⭐ {product.rating} / 5.0 (234 리뷰)</div>
          <div className="text-xl font-bold text-gray-800">{product.price.toLocaleString()}원</div>

          {/* ✅ 배송 정보 뱃지 */}
          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">무료배송</span>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">당일발송</span>
          </div>

          {/* ✅ 구매 버튼 */}
          <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg">
            구매하기
          </button>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">두피 유형별 사용자 경험</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {product.scalpTypes.map((type, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700"
            >
              {type}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">구매자 리뷰</h3>
        <ul className="space-y-4">
          {product.reviews.map((review, idx) => (
            <li key={idx} className="border p-4 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <strong>{review.user}</strong>
                <span className="text-xs text-white bg-blue-400 px-2 py-0.5 rounded-full">
                  {review.type}
                </span>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
