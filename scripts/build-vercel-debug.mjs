import whyIsNodeRunning from 'why-is-node-running'
import { spawn } from 'node:child_process'

const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const child = spawn(cmd, ['run', 'build:main'], { stdio: 'inherit', env: process.env })

child.on('exit', (code) => {
  whyIsNodeRunning()
  setTimeout(() => process.exit(code ?? 1), 1000)
})

child.on('error', (err) => {
  console.error(err)
  process.exit(1)
})
