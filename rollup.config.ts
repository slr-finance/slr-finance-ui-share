import path from 'path'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: path.join(__dirname, 'src/index.ts'),
  output: [{
    dir: path.join(__dirname, 'dist'),
    esModule: true,
    exports: 'named',
    format: 'es',
    sourcemap: true,
  }],
  plugins: [
    eslint({
      exclude: ['node_modules/**', 'dist'],
    }),
    nodeResolve({
      extensions: ['.ts'],
      modulesOnly: true,
      rootDir: path.join(__dirname, 'src'),
    }),
    typescript({
      declaration: true,
      tsconfig : './tsconfig.json'
    }),
  ],
})
