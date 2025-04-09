import { useState } from "react";

export default function ResultCard({ item }) {
  const [open, setOpen] = useState(false);

  const severityColor = {
    정상: "bg-green-200 text-green-800",
    경증: "bg-yellow-200 text-yellow-800",
    중등증: "bg-orange-200 text-orange-800",
    중증: "bg-red-200 text-red-800",
  };

  const barColor = {
    정상: "bg-green-500",
    경증: "bg-yellow-500",
    중등증: "bg-orange-500",
    중증: "bg-red-500",
  };

  const handleClick = () => setOpen(!open);

  return (
    <div
      className="bg-white dark:bg-gray-800 border rounded-lg p-4 mb-4 shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* 상단: 이름 + 뱃지 */}
      <div className="flex justify-between items-center mb-2">
        <strong className="text-lg">{item.disease}</strong>
        <span className={`px-3 py-1 text-sm rounded-full ${severityColor[item.severity]}`}>
          {item.severity}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`${barColor[item.severity]} h-2 rounded-full`}
          style={{ width: `${item.confidence}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">신뢰도: {item.confidence}%</p>

      {/* 상세 정보: 클릭 시 열림 */}
      {open && (
        <div className="mt-3 text-sm">
          {item.severity === "정상" && (
            <p className="text-green-600">{item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}</p>
          )}

          {(item.severity === "경증" || item.severity === "중등증") && item.recommendations && (
            <>
              <strong>추천 제품</strong>
              <ul className="list-disc list-inside mt-1 text-gray-700 dark:text-gray-300">
                {item.recommendations.map((rec, i) => (
                  <li key={i}>
                    {rec.name} ({rec.category}) - 유사도: {rec.similarity}
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.severity === "중증" && item.hospital_recommendation && (
            <p className="text-red-600 font-medium">{item.hospital_recommendation}</p>
          )}
        </div>
      )}
    </div>
  );
}
