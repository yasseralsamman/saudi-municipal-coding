// SPDX-License-Identifier: MIT
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Declarations are emitted by `tsc` (see the package build script).
  dts: false,
  clean: true,
  // No sourcemaps: the bundle is mostly inlined JSON, so maps add noise with
  // no debugging value.
  sourcemap: false,
});
