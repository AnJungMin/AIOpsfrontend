import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20 bg-slate-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        AI가 분석하는 맞춤형 두피 케어
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        단 1분만에 당신의 두피 상태를 분석하고 맞춤 솔루션을 제공합니다
      </p>
      <button
        onClick={() => navigate("/diagnosis")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        지금 진단하기
      </button>

      {/* 진단 프로세스 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">진단 프로세스</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          <Step number="01" title="두피 사진 업로드" desc="스마트폰으로 촬영한 두피 사진을 업로드하세요" />
          <Step number="02" title="AI 분석" desc="첨단 AI가 두피 상태를 정밀 분석합니다" />
          <Step number="03" title="맞춤 솔루션" desc="분석 결과에 따른 제품을 추천받으세요" />
        </div>
      </section>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-[250px] text-center">
      <p className="text-blue-600 font-bold text-lg">{number}</p>
      <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{desc}</p>
    </div>
  );
}
