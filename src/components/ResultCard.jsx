import { useState } from "react";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);

  const severityStyle = {
    정상: "bg-green-100 text-green-800",
    경증: "bg-yellow-100 text-yellow-800",
    중등증: "bg-orange-100 text-orange-800",
    중증: "bg-red-100 text-red-800",
  };

  const barColor = {
    정상: "bg-green-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  const handleClick = () => setOpen(!open);

  const cleanKey = item.disease?.trim();
  const recsFromJson = recommendationsJson?.[cleanKey] || [];

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
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-5 shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cleanKey}</h4>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[item.severity]}`}
        >
          {item.severity}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 ${barColor[item.severity]}`}
          style={{ width: `${confidencePercent}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        신뢰도: {confidencePercent}%
      </p>

      {open && (
        <div className="text-sm mt-3 space-y-2">
          {item.severity === "정상" && (
            <p className="text-green-600">
              {item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}
            </p>
          )}

          {(item.severity === "경증" || item.severity === "중등증") && recsFromJson.length > 0 && (
            <div>
              <strong className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                추천 제품
              </strong>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {recsFromJson.map((rec, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{rec.product_name}</span> ({rec.category}) - 유사도:{" "}
                    {(rec.similarity * 100).toFixed(2)}%
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
