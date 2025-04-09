export default function UploadForm({ onFileChange, onUpload }) {
  return (
    <section className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-2">두피 질환 AI 진단</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        두피 사진을 업로드하면 AI가 자동으로 질환을 분석하고 맞춤 추천을 드려요.
      </p>
      <input type="file" accept="image/*" onChange={onFileChange} />
      <button
        onClick={onUpload}
        className="ml-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
      >
        진단 시작
      </button>
    </section>
  );
}
