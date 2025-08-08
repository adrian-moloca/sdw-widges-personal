import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('staging'),
  },
  build: {
    lib: {
      entry: 'src/widget/main.tsx',
      name: 'SDWResults',
      fileName: 'competition-results',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  server: {
    host: process.env.HOST ?? true,
    allowedHosts: [
      '.olympicchannel.com',
      'bd-sdw-widget-app01-fee8hcdrcyh0h4hk.westeurope-01.azurewebsites.net',
    ],
  },
}));
