import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  typescript: {
    ignoreBuildErrors: true,
  },
  build: {
    // @ts-ignore
    ignoreBuildErrors: true,
  },
  plugins: [
    react(),
    // @ts-ignore
    tailwindcss()
  ],
})

