import { useParams } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>제품을 찾을 수 없습니다.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* 왼쪽: 이미지 */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* 오른쪽: 정보 + 버튼 */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="text-yellow-500 text-sm mb-1">⭐ {product.rating} / 5.0 (234 리뷰)</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {product.price.toLocaleString()}원
            </div>

            {/* 뱃지 */}
            <div className="flex gap-2 mb-4">
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">무료배송</span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">당일발송</span>
            </div>
          </div>

          {/* 구매 버튼 */}
          <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            구매하기
          </button>
        </div>
      </div>

      {/* 두피 유형 */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">추천 두피 유형</h3>
        <div className="flex gap-2 mb-4">
          {product.scalpTypes.map((type, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        {/* 리뷰 */}
        <h3 className="text-lg font-semibold mb-2">구매자 리뷰</h3>
        <ul className="space-y-4">
          {product.reviews.map((r, i) => (
            <li key={i} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <strong>{r.user}</strong>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{r.type}</span>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{r.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
