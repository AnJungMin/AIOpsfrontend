// src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await axios.post('https://test2-o3ij.onrender.com/api/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('업로드 실패');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>진단하기</button>

      {result && (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default UploadForm;
