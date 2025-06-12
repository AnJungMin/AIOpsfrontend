import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 3단계 매핑 (중등증/중등도 제거!)
  const severityMapping = {
    정상: "양호",
    경증: "제품추천",
    중증: "병원추천",
  };

  const severityStyle = {
    양호: "bg-green-100 text-green-800",
    제품추천: "bg-yellow-100 text-yellow-800",
    병원추천: "bg-red-100 text-red-800",
  };

  const severityBarColor = {
    양호: "bg-green-400",
    제품추천: "bg-yellow-400",
    병원추천: "bg-red-400",
  };

  const handleClick = () => setOpen(!open);

  const cleanKey = item.disease?.trim();
  const diseaseInfo = recommendationsJson?.disease_info?.[cleanKey] || {};
  const goodTokens = diseaseInfo.good_tokens || [];
  const recsFromJson = recommendationsJson?.recommendations?.[cleanKey] || [];

  // confidence 정수 변환
  const rawConfidence = item.confidence || "0";
  const numericConfidence = parseFloat(
    typeof rawConfidence === "string" ? rawConfidence.replace("%", "") : rawConfidence
  );

  // severity 3단계 매핑 적용
  const originalSeverity = item.severity || "정상";
  const severity = severityMapping[originalSeverity] || "양호";

  // 게이지 바: 3단계 구간 내 confidence 반영
  const stepRanges = {
    양호: [0, 33.33],
    제품추천: [33.33, 66.66],
    병원추천: [66.66, 100],
  };
  const [minPercent, maxPercent] = stepRanges[severity] || [0, 33.33];
  const confidenceRate = Math.min(1, numericConfidence / 100);
  const totalFillPercent = minPercent + (maxPercent - minPercent) * confidenceRate;

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-5 shadow hover:shadow-md transition cursor-pointer"
    >
      {/* 제목 + 상태 배지 */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cleanKey}</h4>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[severity]}`}>
          {severity}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 ${severityBarColor[severity]}`}
          style={{ width: `${totalFillPercent}%` }}
        />
      </div>

      {/* 상세 내용 */}
      {open && (
        <div className="text-sm mt-4 space-y-4">
          {severity === "양호" && (
            <p className="text-green-600">
              {item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}
            </p>
          )}

          {severity === "제품추천" && recsFromJson.length > 0 && (
            <div className="space-y-3">
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                ▶ 질환별 좋은 성분 리스트:{" "}
                <span className="font-normal">{goodTokens.join(", ")}</span>
              </div>
              {recsFromJson.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-700 mb-2 shadow-sm"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{rec.product_name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">{rec.category}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-blue-600">
                      ▶ 코사인 유사도: {(rec.similarity * 100).toFixed(2)}%
                    </span>
                  </div>
                  {/* ✅ 체크된(포함된) 성분만 표시 */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {goodTokens
                      .filter(token => rec.top_tokens.includes(token))
                      .map((token, tIdx) => (
                        <span
                          key={tIdx}
                          className="flex items-center px-2 py-1 rounded text-xs border bg-green-100 border-green-400 text-green-700"
                        >
                          ✔️ {token}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {severity === "병원추천" && (
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
