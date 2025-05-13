// pages/CommunityPage.jsx
import { Link } from "react-router-dom";

const categories = [
  "미세각질", "피지과다", "모낭사이홍반", "모낭농포", "비듬", "탈모"
];

const popularPosts = [
  { title: "[탈모] 탈모 관리 꿀팁 공유합니다", views: 1234 },
  { title: "[비듬] 비듬 샴푸 추천해주세요", views: 987 },
  { title: "[피지과다] 피지 조절하는 방법", views: 856 },
];

export default function CommunityPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">커뮤니티</h2>

      {/* ✅ 질환 카테고리 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <h3 className="text-lg font-bold mb-2">{category}</h3>
            <ul className="space-y-1 text-sm text-blue-600">
              <li><Link to="#">관리 방법</Link></li>
              <li><Link to="#">제품 추천</Link></li>
              <li><Link to="#">자유게시판</Link></li>
              <li><Link to="#">Q&A</Link></li>
            </ul>
          </div>
        ))}
      </div>

      {/* ✅ 인기 게시글 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">최근 인기 게시글</h3>
        <ul className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y">
          {popularPosts.map((post, idx) => (
            <li key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span>{post.title}</span>
              <span className="text-sm text-gray-400">조회수 {post.views.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
