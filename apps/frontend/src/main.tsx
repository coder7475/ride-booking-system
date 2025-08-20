import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/index.tsx'
import { ThemeProvider } from './providers/theme-proider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors/>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
  