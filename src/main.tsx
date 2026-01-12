import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider' // 1. Import the Provider
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap the app here so useAuth() works */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)