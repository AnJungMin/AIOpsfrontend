import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.predictions;

  // 🔐 상태 없을 경우 홈으로 자동 리디렉션
  useEffect(() => {
    if (!result || result.length === 0) {
      alert("결과가 없습니다. 홈으로 돌아갑니다.");
      navigate("/");
    }
  }, [result, navigate]);

  const severityColor = {
    정상: "bg-lime-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  // ✅ result가 없으면 아무것도 렌더링하지 않음
  if (!result) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">진단 결과</h3>
      {result.map((item, idx) => (
        <ResultCard key={idx} item={item} severityColor={severityColor} />
      ))}
    </section>
  );
}
