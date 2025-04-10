import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import recommendationsJson from "../data/recommendations.json";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("scalpcare_result");
      const parsed = stored ? JSON.parse(stored) : null;

      const finalResult = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.results)
        ? parsed.results
        : [];

      if (!finalResult.length) {
        alert("예측 결과가 없습니다. 홈으로 돌아갑니다.");
        navigate("/");
        return;
      }

      setResult(finalResult);
    } catch (err) {
      console.error("결과 파싱 중 오류:", err);
      alert("결과를 불러오지 못했습니다.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        진단 결과
      </h3>

      <div className="space-y-4">
        {result.map((item, idx) => (
          <ResultCard
            key={idx}
            item={item}
            recommendationsJson={recommendationsJson}
          />
        ))}
      </div>
    </section>
  );
}
