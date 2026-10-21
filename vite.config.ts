import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // The original CRA app was deployed at this GitHub Pages repository path.
  base: process.env.GITHUB_PAGES === 'true' ? '/Search-repos-react/' : '/',
  plugins: [react()],
  resolve: {
    // Prefer migrated components when a legacy JSX file has the same name.
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
