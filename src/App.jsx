import { useState } from "react";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("이미지를 선택해주세요!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("https://test2-o3lj.onrender.com/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.predictions);
    } catch (err) {
      alert("예측 요청에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const severityColor = {
    정상: "bg-lime-400",
    경증: "bg-yellow-400",
    중등증: "bg-orange-400",
    중증: "bg-red-400",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <UploadForm onFileChange={handleFileChange} onUpload={handleUpload} />

        {loading && (
          <p className="text-center text-sm text-gray-500 mb-6">AI 진단 중입니다... 잠시만 기다려주세요.</p>
        )}

        {result?.results?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">진단 결과</h3>
            {result.results.map((item, idx) => (
              <ResultCard key={idx} item={item} severityColor={severityColor} />
            ))}
          </section>
        )}
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        ⓒ 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
