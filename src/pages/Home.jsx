import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-white shadow">
        <h1 className="text-2xl font-bold">ScalpCare</h1>
        <nav>
          <button
            onClick={() => navigate("/diagnosis")}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            진단 시작
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">두피 상태, AI로 간편하게 진단하세요</h2>
        <p className="mb-6 text-lg text-gray-600">사진을 업로드하면 맞춤 진단과 추천을 받아보실 수 있어요.</p>
        <button
          onClick={() => navigate("/diagnosis")}
          className="bg-green-500 text-white px-6 py-3 text-lg rounded-full hover:bg-green-600 transition"
        >
          지금 진단하러 가기 →
        </button>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🔍 AI 진단</h3>
            <p className="text-gray-600">이미지 기반으로 정확하게 두피 상태를 분석해요.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🛍️ 제품 추천</h3>
            <p className="text-gray-600">질환에 맞는 제품을 추천해드려요.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🏥 병원 안내</h3>
            <p className="text-gray-600">심각한 경우 주변 피부과를 추천해드려요.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        ⓒ 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}
