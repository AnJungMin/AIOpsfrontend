import { useState } from "react";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

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

  const recsFromJson = recommendationsJson?.[item.disease] || [];

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{item.disease}</h4>
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
          style={{ width: `${item.confidence}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mb-2">
        신뢰도: {parseFloat(item.confidence).toFixed(2)}%
      </p>

      {/* Detail area */}
      {open && (
        <div className="text-sm mt-3 space-y-2">
          {item.severity === "정상" && (
            <p className="text-green-600">{item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}</p>
          )}

          {(item.severity === "경증" || item.severity === "중등증") && recsFromJson.length > 0 && (
            <div>
              <strong className="block mb-1">추천 제품</strong>
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
