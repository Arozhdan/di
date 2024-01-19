import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@lib": path.resolve(__dirname, "./src/shared/lib"),
        "@components": path.resolve(__dirname, "./src/shared/components/ui"),
        "@widgets": path.resolve(__dirname, "./src/widgets"),
      },
    },
    css: {
      modules: {
        scopeBehaviour: "local",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        globalModulePaths: [/global\.(css|less|sass|scss)$/],
        localsConvention: "camelCase",
      },
    },
    define: {
      __IS_DEV__: mode === "development",
      __API__: JSON.stringify(env.VITE_API_URL),
      __SERVER__: JSON.stringify(env.VITE_SERVER_URL),
    },
  }
})
