import { useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const location = useLocation();
  const result = location.state?.predictions;

  const severityColor = {
    정상: "bg-lime-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  if (!result || result.length === 0) {
    return (
      <p className="text-center text-gray-500">진단 결과가 없습니다. 먼저 사진을 업로드해주세요.</p>
    );
  }

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">진단 결과</h3>
      {result.map((item, idx) => (
        <ResultCard key={idx} item={item} severityColor={severityColor} />
      ))}
    </section>
  );
}
