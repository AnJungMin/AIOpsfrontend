// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 개발 서버에서는 필요 없음
  },
  build: {
    // 이 아래는 있어도 되고 없어도 됨
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  // ✅ 추가: 모든 경로를 index.html로 fallback 하도록 설정
  define: {
    "process.env": {},
  },
  base: './',
});
