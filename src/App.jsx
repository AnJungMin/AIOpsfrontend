import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Diagnosis from "./pages/DiagnosisPage";
import Result from "./pages/Result";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import MapPage from "./pages/MapPage";
import CommunityPage from "./pages/CommunityPage";

// ✅ 임시 컴포넌트 (없으면 에러)
const LoginPage = () => <div className="p-6">로그인 페이지 준비 중입니다.</div>;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </>
  );
}

export default App;
