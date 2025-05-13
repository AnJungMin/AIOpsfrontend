import { Link } from "react-router-dom";

export default function CommunityCategoryCard({ title }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <ul className="space-y-1 text-sm text-blue-600">
        <li><Link to="#">관리 방법</Link></li>
        <li><Link to="#">제품 추천</Link></li>
        <li><Link to="#">자유게시판</Link></li>
        <li><Link to="#">Q&A</Link></li>
      </ul>
    </div>
  );
}
