import { useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // 댓글 상태: 인덱스별로 댓글 리스트 저장
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  if (!product) return <p>제품을 찾을 수 없습니다.</p>;

  const handleCommentChange = (reviewIdx, value) => {
    setNewComment((prev) => ({ ...prev, [reviewIdx]: value }));
  };

  const handleCommentSubmit = (reviewIdx) => {
    const comment = newComment[reviewIdx];
    if (!comment?.trim()) return;

    setComments((prev) => ({
      ...prev,
      [reviewIdx]: [...(prev[reviewIdx] || []), comment],
    }));

    setNewComment((prev) => ({ ...prev, [reviewIdx]: "" }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* 이미지 */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* 정보 + 버튼 */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="text-yellow-500 text-sm mb-1">⭐ {product.rating} / 5.0 (234 리뷰)</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {product.price.toLocaleString()}원
            </div>

            <div className="flex gap-2 mb-4">
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">무료배송</span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">당일발송</span>
            </div>
          </div>

          <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            구매하기
          </button>
        </div>
      </div>

      {/* 두피 유형 */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">추천 두피 유형</h3>
        <div className="flex gap-2 mb-6">
          {product.scalpTypes.map((type, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        {/* 리뷰 + 댓글 */}
        <h3 className="text-lg font-semibold mb-2">제품 커뮤니티</h3>
        <ul className="space-y-6">
          {product.reviews.map((r, i) => (
            <li key={i} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <strong>{r.user}</strong>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{r.type}</span>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{r.content}</p>

              {/* 댓글 목록 */}
              {comments[i]?.length > 0 && (
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {comments[i].map((c, j) => (
                    <div key={j} className="pl-3 border-l-4 border-blue-300">
                      💬 {c}
                    </div>
                  ))}
                </div>
              )}

              {/* 댓글 입력창 */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newComment[i] || ""}
                  onChange={(e) => handleCommentChange(i, e.target.value)}
                  placeholder="댓글을 입력하세요"
                  className="flex-1 border px-3 py-1 rounded text-sm"
                />
                <button
                  onClick={() => handleCommentSubmit(i)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  등록
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
