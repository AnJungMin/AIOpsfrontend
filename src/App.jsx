import { useState } from 'react';
import axios from 'axios';
import ToggleButton from './components/ToggleButton'; // 다크모드 토글 버튼 (선택)

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await axios.post('https://test2-o3lj.onrender.com/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(res.data.predictions);
    } catch (err) {
      alert('예측 요청에 실패했습니다.');
    }
  };

  const severityColor = {
    정상: 'bg-lime-400',
    경증: 'bg-yellow-400',
    중등증: 'bg-orange-400',
    중증: 'bg-red-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">🧠 ScalpCare</h1>
        <ToggleButton />
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">두피 질환 AI 진단</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            두피 사진을 업로드하면 AI가 자동으로 질환을 분석하고 맞춤 추천을 드려요.
          </p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="ml-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
          >
            진단 시작
          </button>
        </section>

        {/* 진단 결과 */}
        {result?.results?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">진단 결과</h3>
            {result.results.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-6 mb-6 bg-white dark:bg-gray-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-lg">{item.disease}</strong>
                  <span
                    className={`text-sm text-gray-800 px-3 py-1 rounded-full font-semibold ${severityColor[item.severity]}`}
                  >
                    {item.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  신뢰도: {item.confidence}
                </p>

                {item.recommendations && (
                  <div>
                    <strong>추천 제품</strong>
                    <ul className="list-disc list-inside text-sm mt-1">
                      {item.recommendations.map((rec, rIdx) => (
                        <li key={rIdx}>
                          {rec.name} ({rec.category}) - 유사도: {rec.similarity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.comment && (
                  <p className="text-green-600 font-medium">{item.comment}</p>
                )}

                {item.hospital_recommendation && (
                  <p className="text-red-600 font-medium">{item.hospital_recommendation}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6">
        ⓒ 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
