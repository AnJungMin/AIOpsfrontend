import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DiagnosisPage from "./pages/DiagnosisPage"; // 이름 변경
import Home from "./pages/Home"; // LandingPage
import Result from "./pages/Result";
import About from "./pages/About";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} /> {/* ✅ 메인 페이지 */}
          <Route path="/diagnosis" element={<DiagnosisPage />} /> {/* ✅ 진단 페이지 */}
          <Route path="/result" element={<Result />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>
      <footer className="text-center text-sm text-gray-400 py-6">
        ⓒ 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
