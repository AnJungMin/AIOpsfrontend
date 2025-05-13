export default function CommunityPostList({ posts }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">최근 인기 게시글</h3>
      <ul className="bg-white dark:bg-gray-800 divide-y rounded-xl">
        {posts.map((post, idx) => (
          <li key={idx} className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
            <span>{post.title}</span>
            <span className="text-sm text-gray-500">조회수 {post.views.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
