import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@react-three/drei'],
  },

  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },

  plugins: [
    react(),
    // @ts-ignore
    tailwindcss()
  ],
})

