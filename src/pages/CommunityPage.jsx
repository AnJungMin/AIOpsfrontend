import CommunityCategoryCard from "../components/CommunityCategoryCard";
import CommunityPostList from "../components/CommunityPostList";
import posts from "../data/communityPosts.json";

const categories = ["미세각질", "피지과다", "모낭사이홍반", "모낭농포", "비듬", "탈모"];

export default function CommunityPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">커뮤니티</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {categories.map((cat) => (
          <CommunityCategoryCard key={cat} title={cat} />
        ))}
      </div>

      <CommunityPostList posts={posts} />
    </div>
  );
}
