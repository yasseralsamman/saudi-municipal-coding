// SPDX-License-Identifier: MIT
//
// Build pipeline entry point. Reads the immutable source data, validates it,
// and writes every artifact to data/dist/, then copies the JSON outputs into
// the two packages.

import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { citiesCsv, districtsCsv, regionsCsv } from './lib/csv.js';
import { DIST_DIR, REPO_ROOT, loadSource } from './lib/load.js';
import { mysqlSql, postgresSql } from './lib/sql.js';
import { validate } from './validate.js';

// Deterministic build timestamp = the source snapshot date. Keeping this fixed
// (rather than `new Date()`) makes the build reproducible so the committed
// data/dist matches a fresh rebuild in CI (`pnpm run check:dist-clean`).
const GENERATED_AT = '2026-06-10T00:00:00.000Z';

const JS_DATA_DIR = join(REPO_ROOT, 'packages', 'js', 'data');
const PHP_DATA_DIR = join(REPO_ROOT, 'packages', 'php', 'data');

function writeJson(file: string, data: unknown): void {
  writeFileSync(join(DIST_DIR, file), JSON.stringify(data));
}

function writeText(file: string, text: string): void {
  writeFileSync(join(DIST_DIR, file), text);
}

function main(): void {
  mkdirSync(DIST_DIR, { recursive: true });
  mkdirSync(JS_DATA_DIR, { recursive: true });
  mkdirSync(PHP_DATA_DIR, { recursive: true });

  // Step 1 + 2: load + validate (abort on failure).
  const { regions, cities, districts } = loadSource();
  validate();

  // Step 3: write artifacts.
  // Bare-array JSON outputs.
  writeJson('regions.json', regions);
  writeJson('cities.json', cities);
  writeJson('districts.json', districts);

  // CSV.
  writeText('regions.csv', regionsCsv(regions));
  writeText('cities.csv', citiesCsv(cities));
  writeText('districts.csv', districtsCsv(districts));

  // SQL.
  writeText('mysql.sql', mysqlSql(GENERATED_AT, regions, cities, districts));
  writeText('postgres.sql', postgresSql(GENERATED_AT, regions, cities, districts));

  // Step 4: copy JSON outputs into the packages so they ship bundled.
  for (const f of ['regions.json', 'cities.json', 'districts.json']) {
    copyFileSync(join(DIST_DIR, f), join(JS_DATA_DIR, f));
    copyFileSync(join(DIST_DIR, f), join(PHP_DATA_DIR, f));
  }

  // Step 5: stats summary.
  console.log('Build complete.');
  console.log(`  regions:   ${regions.length}`);
  console.log(`  cities:    ${cities.length}`);
  console.log(`  districts: ${districts.length}`);
  console.log(`  output:    ${DIST_DIR}`);
}

main();
