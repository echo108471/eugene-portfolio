import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import path from 'path'

// Resolve the last commit's ISO timestamp at build time so the site can render
// a live "last commit N ago" string in the browser. Falls back to the build
// time when git isn't available (e.g. building from a tarball).
function lastCommitDate(): string {
  try {
    return execSync('git log -1 --format=%cI').toString().trim()
  } catch {
    return new Date().toISOString()
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_COMMIT_DATE__: JSON.stringify(lastCommitDate()),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
