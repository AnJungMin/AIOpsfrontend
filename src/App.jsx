import { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await axios.post('https://test2-o3lj.onrender.com/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("예측 결과:", res.data); // 디버깅용
      setResult(res.data);
    } catch (err) {
      console.error('업로드 실패:', err);
      alert('예측 요청에 실패했습니다.');
    }
  };

  const severityColor = {
    정상: '#a3e635',
    경증: '#facc15',
    중등증: '#fb923c',
    중증: '#f87171',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>두피 질환 예측</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>업로드</button>

      {result?.results?.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>진단 결과</h3>
          {result.results.map((item, idx) => (
            <div key={idx} style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{item.disease}</strong>
                <span style={{
                  backgroundColor: severityColor[item.severity] || '#ccc',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {item.severity}
                </span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
                신뢰도: {item.confidence}
              </div>

              {item.recommendations && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>추천 제품</strong>
                  <ul style={{ paddingLeft: 20 }}>
                    {item.recommendations.map((rec, rIdx) => (
                      <li key={rIdx}>
                        {rec.name} ({rec.category}) - 유사도: {rec.similarity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.comment && (
                <div style={{ marginTop: '1rem', color: '#16a34a' }}>{item.comment}</div>
              )}

              {item.hospital_recommendation && (
                <div style={{ marginTop: '1rem', color: '#dc2626' }}>
                  {item.hospital_recommendation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
