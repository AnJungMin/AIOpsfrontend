import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("scalpcare_result");

    if (!stored) {
      alert("예측 결과가 없습니다. 홈으로 돌아갑니다.");
      navigate("/");
    } else {
      setResult(JSON.parse(stored));
    }
  }, [navigate]);

  const severityColor = {
    정상: "bg-lime-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

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
