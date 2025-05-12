// CameraUploadForm.jsx
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function CameraUploadForm({ onFileChange, onUpload }) {
  const webcamRef = useRef(null);
  const [useCamera, setUseCamera] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "capture.jpg", { type: mimeString });

      setImagePreview(imageSrc);
      onFileChange({ target: { files: [file] } });
      onUpload(); // ✅ 자동 업로드
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onFileChange(e);
      onUpload(); // ✅ 자동 업로드
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-center">두피 질환 AI 진단</h2>
      <p className="text-center text-gray-500 dark:text-gray-400">
        사진을 업로드하거나, 카메라로 촬영해 주세요!
      </p>

      {/* 모드 선택 */}
      <div className="flex gap-4">
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

      {/* 파일 선택 */}
      {!useCamera && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="mt-2"
        />
      )}

      {/* 카메라 */}
      {useCamera && (
        <div className="flex flex-col items-center gap-2">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="rounded-xl shadow max-w-full"
          />
          <button
            onClick={handleCapture}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            촬영하기
          </button>
        </div>
      )}

      {/* 미리보기 */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-4 rounded-xl max-h-64 shadow"
        />
      )}
    </div>
  );
}
