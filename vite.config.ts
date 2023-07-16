import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

type ViteConfigInput = {
  mode: string,
  command: string,
};
export default (args: ViteConfigInput) => {
  const generateScopedName = args.mode === 'production' ? "[hash:base64:2]" : "[local]_[hash:base64:2]";
  return defineConfig(
    {
      plugins: [react()],
      css: {
        modules: {
          localsConvention: "camelCase",
          generateScopedName 
        }
      }
    });
};
