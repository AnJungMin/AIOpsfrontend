import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";

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
      // 👉 결과 페이지로 이동하면서 상태 전달
      navigate("/result", { state: { predictions: data.predictions } });
    } catch (err) {
      alert("예측 요청에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UploadForm onFileChange={handleFileChange} onUpload={handleUpload} />
      {loading && (
        <p className="text-center text-sm text-gray-500 mt-4">
          AI 진단 중입니다... 잠시만 기다려주세요.
        </p>
      )}
    </>
  );
}
