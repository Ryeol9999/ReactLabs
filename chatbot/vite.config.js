import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // SockJS가 global을 찾을 수 있게 함
  },
  server: {
    host: '0.0.0.0',   // 외부 접근 허용
    port: 5173,        // 포트 변경 가능
    open: true,        // 자동 브라우저 열기
  },
});