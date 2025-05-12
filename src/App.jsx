import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Result from "./pages/Result";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import MapPage from "./pages/MapPage"; // ✅ 지도 페이지 추가!

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<MapPage />} /> {/* ✅ 지도 경로 추가 */}
        </Routes>
      </main>
      <footer className="text-center text-sm text-gray-400 py-6">
        ⓒ 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
