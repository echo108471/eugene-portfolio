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

interface Commit {
  hash: string
  author: string
  subject: string
  url: string
}

// Normalize the origin remote into a browsable https URL so commit hashes can
// link to GitHub. Returns "" when there's no usable remote.
function repoUrl(): string {
  try {
    const remote = execSync('git remote get-url origin').toString().trim()
    return remote
      .replace(/^git@github\.com:/, 'https://github.com/')
      .replace(/\.git$/, '')
  } catch {
    return ''
  }
}

// Pull the most recent commits at build time to power the footer commit log.
// Uses unit-separator (\x1f) field delimiters so commit subjects stay intact.
function recentCommits(count = 3): Commit[] {
  const base = repoUrl()
  try {
    const raw = execSync(`git log -${count} --abbrev=6 --format=%h%x1f%H%x1f%an%x1f%s`)
      .toString()
      .trim()
    if (!raw) return []
    return raw.split('\n').map((line) => {
      const [hash, fullHash, author, subject] = line.split('\x1f')
      return { hash, author, subject, url: base ? `${base}/commit/${fullHash}` : '' }
    })
  } catch {
    return []
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_COMMIT_DATE__: JSON.stringify(lastCommitDate()),
    __RECENT_COMMITS__: JSON.stringify(recentCommits(3)),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
