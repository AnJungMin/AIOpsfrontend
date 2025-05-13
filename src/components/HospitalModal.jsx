// components/HospitalModal.jsx
import { useState } from "react";

export default function HospitalModal({ hospital, onClose }) {
  const [form, setForm] = useState({
    department: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("예약이 완료되었습니다!");
    onClose();
  };

  if (!hospital) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-2">병원 예약</h2>
        <p className="font-semibold">{hospital.place_name}</p>
        <p className="text-sm text-gray-600">{hospital.address_name}</p>
        <p className="text-sm mb-4">02-1234-5678</p>

        <input
          type="text"
          name="department"
          placeholder="진료과목"
          className="w-full p-2 mb-2 border rounded"
          value={form.department}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 mb-2 border rounded"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          className="w-full p-2 mb-2 border rounded"
          value={form.time}
          onChange={handleChange}
        />
        <textarea
          name="symptoms"
          placeholder="증상"
          className="w-full p-2 mb-4 border rounded"
          rows={3}
          value={form.symptoms}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            취소
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
