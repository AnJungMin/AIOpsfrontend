import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

export default function DiagnosisPage() {
  const [useCamera, setUseCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!image) return alert("이미지를 선택해주세요!");

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

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPreviewUrl(imageSrc);

      // 이미지 blob 변환
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "capture.jpg", { type: mimeString });
      setImage(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">두피 질환 AI 진단</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          사진을 업로드하거나, 카메라로 촬영해 주세요!
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setUseCamera(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !useCamera ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            파일 업로드
          </button>
          <button
            onClick={() => setUseCamera(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              useCamera ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            카메라 촬영
          </button>
        </div>

        {/* ✅ 선택된 모드에 따라 UI 분기 */}
        {useCamera ? (
          <div className="flex flex-col items-center gap-2 mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="rounded-xl shadow max-w-full"
            />
            <button
              onClick={capture}
              className="px-4 py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              촬영하기
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full"
            />
          </div>
        )}

        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            className="mt-4 rounded-xl max-h-64 mx-auto shadow"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "진단 중..." : "진단 시작"}
        </button>
      </div>

      <footer className="mt-8 text-xs text-gray-400">
        © 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}
