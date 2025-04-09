import { useState } from "react";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);

  const severityStyle = {
    정상: "bg-green-100 text-green-700",
    경증: "bg-yellow-100 text-yellow-700",
    중등증: "bg-orange-100 text-orange-700",
    중증: "bg-red-100 text-red-700",
  };

  const barColor = {
    정상: "bg-green-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  const handleClick = () => setOpen(!open);

  // 🔧 질환명 정제 (앞뒤 공백 제거)
  const cleanKey = item.disease?.trim();
  const recsFromJson = recommendationsJson?.[cleanKey] || [];

  // 🪵 디버깅용 로그
  console.log("질환명:", item.disease);
  console.log("cleanKey:", cleanKey);
  console.log("추천 제품:", recsFromJson);

  // NaN 방지: % 제거 후 숫자로 변환
  const rawConfidence = item.confidence || "0";
  const numericConfidence = parseFloat(
    typeof rawConfidence === "string" ? rawConfidence.replace("%", "") : rawConfidence
  );
  const confidencePercent = isNaN(numericConfidence)
    ? 0
    : Math.min(100, numericConfidence.toFixed(2));

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-base font-semibold">{cleanKey}</h4>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[item.severity]}`}
        >
          {item.severity}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full ${barColor[item.severity]}`}
          style={{ width: `${confidencePercent}%` }}
        />
      </div>

      <p className="text-sm text-gray-500">신뢰도: {confidencePercent}%</p>

      {/* Detail area */}
      {open && (
        <div className="text-sm mt-4 space-y-2">
          {item.severity === "정상" && (
            <p className="text-green-600">
              {item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}
            </p>
          )}

          {(item.severity === "경증" || item.severity === "중등증") && recsFromJson.length > 0 && (
            <div>
              <strong className="block mb-1 text-gray-700 dark:text-gray-300">추천 제품</strong>
              <ul className="list-disc list-inside space-y-1">
                {recsFromJson.map((rec, idx) => (
                  <li key={idx}>
                    {rec.product_name} ({rec.category}) - 유사도: {(rec.similarity * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.severity === "중증" && (
            <p className="text-red-600 font-semibold">
              {item.hospital_recommendation || "증상이 심각할 수 있어 피부과 방문을 권장합니다."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
