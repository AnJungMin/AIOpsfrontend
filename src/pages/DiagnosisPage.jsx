import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraUploadForm from "../components/CameraUploadForm";

export default function DiagnosisPage() {
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageCapture = (capturedBlob) => {
    setImage(capturedBlob);
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
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          사진을 업로드하거나, 카메라로 촬영해 주세요!
        </p>

        <div className="flex justify-center space-x-3 mb-5">
          <button
            onClick={() => setUseCamera(false)}
            className={`px-4 py-2 rounded-lg ${!useCamera ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800"}`}
          >
            파일 업로드
          </button>
          <button
            onClick={() => setUseCamera(true)}
            className={`px-4 py-2 rounded-lg ${useCamera ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800"}`}
          >
            카메라 촬영
          </button>
        </div>

        {useCamera ? (
          <CameraUploadForm onCapture={handleImageCapture} />
        ) : (
          <label htmlFor="file-upload" className="block text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition">
            파일 선택
            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
          </label>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 px-6 py-3 w-full bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50"
        >
          {loading ? "진단 중..." : "진단 시작"}
        </button>

        {loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
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
