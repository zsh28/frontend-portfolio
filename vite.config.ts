import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Define the function parameter type
interface ViteEnvConfig {
  mode: string;
}

export default ({ mode }: ViteEnvConfig) => {
  // Load app-level env vars to node-level env vars
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // Use the loaded env variable
          changeOrigin: true,
          secure: true,
        },
      },
    },
  });
};
