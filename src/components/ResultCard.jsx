import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const severityStyle = {
    정상: "bg-green-100 text-green-800",
    경증: "bg-yellow-100 text-yellow-800",
    중등증: "bg-orange-100 text-orange-800",
    중증: "bg-red-100 text-red-800",
  };

  const severityBarColor = {
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

  // ✅ 4구간 분할 계산
  let baseWidth = 0;
  switch (item.severity) {
    case "정상":
      baseWidth = 25;
      break;
    case "경증":
      baseWidth = 50;
      break;
    case "중등증":
      baseWidth = 75;
      break;
    case "중증":
      baseWidth = 100;
      break;
    default:
      baseWidth = 0;
  }

  // ✅ 추가로 신뢰도 비율만큼 늘리기 (ex: baseWidth + (confidence% / 4))
  const adjustedWidth = Math.min(baseWidth, 100) * (confidencePercent / 100);

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-5 shadow hover:shadow-md transition cursor-pointer"
    >
      {/* 제목 + 상태 배지 */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cleanKey}</h4>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[item.severity]}`}>
          {item.severity}
        </span>
      </div>

      {/* 신뢰도 Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 ${severityBarColor[item.severity]}`}
          style={{ width: `${adjustedWidth}%` }}
        />
      </div>

      {/* 신뢰도 퍼센트 */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        신뢰도: {confidencePercent}%
      </p>

      {/* 클릭하면 열리는 상세 영역 */}
      {open && (
        <div className="text-sm mt-4 space-y-4">
          {item.severity === "정상" && (
            <p className="text-green-600">
              {item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}
            </p>
          )}

          {(item.severity === "경증" || item.severity === "중등증") && recsFromJson.length > 0 && (
            <div className="space-y-2">
              <strong className="block font-semibold text-gray-800 dark:text-gray-200">
                추천 제품
              </strong>

              <div className="grid gap-3">
                {recsFromJson.map((rec, idx) => {
                  const similarity = (rec.similarity * 100).toFixed(2);
                  const similarityBarColor = similarity >= 90 ? "bg-green-400" : "bg-blue-400";

                  return (
                    <div
                      key={idx}
                      className="p-4 border rounded-xl shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-700 transition"
                    >
                      <div className="font-medium text-gray-800 dark:text-white">{rec.product_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{rec.category}</div>

                      <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                        <div
                          className={`h-2 ${similarityBarColor} rounded-full`}
                          style={{ width: `${similarity}%` }}
                        />
                      </div>

                      <div className="text-xs text-gray-400">
                        유사도 {similarity}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {item.severity === "중증" && (
            <div className="space-y-3">
              <p className="text-red-600 font-semibold">
                {item.hospital_recommendation || "증상이 심각할 수 있어 피부과 방문을 권장합니다."}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/map");
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
              >
                주변 피부과 지도 보기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
