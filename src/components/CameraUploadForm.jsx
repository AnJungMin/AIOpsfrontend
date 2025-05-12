import { useRef } from "react";
import Webcam from "react-webcam";

export default function CameraUploadForm({ onCapture }) {
  const webcamRef = useRef(null);

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
      onCapture(file, imageSrc); // ✅ blob과 preview URL 모두 전달
    }
  };

  return (
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
  );
}
