export default function ResultCard({ item, severityColor }) {
    return (
      <div className="border rounded-xl p-6 mb-6 bg-white dark:bg-gray-800 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <strong className="text-lg">{item.disease}</strong>
          <span
            className={`text-sm text-white px-3 py-1 rounded-full font-semibold ${severityColor[item.severity]}`}
          >
            {item.severity}
          </span>
        </div>
  
        <p className="text-sm text-gray-500">신뢰도: {item.confidence}</p>
  
        {item.comment && (
          <p className="text-green-600 font-medium">{item.comment}</p>
        )}
  
        {item.hospital_recommendation && (
          <p className="text-red-600 font-medium">{item.hospital_recommendation}</p>
        )}
  
        {item.recommendations?.length > 0 && (
          <div>
            <strong className="block mb-1">추천 제품</strong>
            <ul className="list-disc list-inside text-sm space-y-1">
              {item.recommendations.map((rec, idx) => (
                <li key={idx}>
                  <span className="font-medium">{rec.name}</span>
                  <span className="text-gray-400"> ({rec.category})</span>
                  <span className="ml-2 text-xs text-gray-500">유사도: {rec.similarity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  