// SPDX-License-Identifier: MIT
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Each test file inlines several MB of bundled JSON. Run files one at a
    // time in isolated forks so memory is released between files.
    pool: 'forks',
    poolOptions: { forks: { minForks: 1, maxForks: 1 } },
  },
});
