import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem("scalpcare_result", JSON.stringify(data.predictions));
      navigate("/result");
    } catch (err) {
      alert("예측 요청에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white p-6">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
          두피 질환 AI 진단
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          두피 사진을 업로드하면 AI가 자동으로 질환을 분석하고 맞춤형 추천을 드려요!
        </p>

        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="file-upload" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition">
            파일 선택
            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "진단 중..." : "진단 시작"}
          </button>
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            AI가 열심히 분석하고 있어요. 잠시만 기다려주세요...
          </p>
        )}
      </div>

      <footer className="mt-10 text-xs text-gray-400">
        © 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}
