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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">두피 질환 AI 진단</h1>
      <p className="text-gray-300 mb-8 text-center">
        두피 사진을 업로드하면 AI가 자동으로 질환을 분석하고<br />맞춤형 추천을 드려요!
      </p>

      <div className="flex flex-col space-y-4">
        <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow cursor-pointer transition text-center">
          파일 선택
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
        >
          {loading ? "진단 중..." : "진단 시작"}
        </button>

        {image && (
          <p className="text-sm text-gray-400 mt-2">
            선택된 파일: {image.name}
          </p>
        )}
      </div>

      <footer className="mt-10 text-xs text-gray-500">
        © 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}
