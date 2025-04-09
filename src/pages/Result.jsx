import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("scalpcare_result");
      const parsed = stored ? JSON.parse(stored) : null;

      // 🔍 객체 안에 results가 있는 경우 처리
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

  const severityColor = {
    정상: "bg-lime-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">진단 결과</h3>
      {result.map((item, idx) => (
        <ResultCard key={idx} item={item} severityColor={severityColor} />
      ))}
    </section>
  );
}
