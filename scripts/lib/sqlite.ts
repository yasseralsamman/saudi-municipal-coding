// SPDX-License-Identifier: MIT
//
// SQLite generation via better-sqlite3. Same schema as the MySQL dump.
//
// This is a CI/release-only artifact: `scripts/build.ts` does NOT call it and
// the resulting *.sqlite file is gitignored. Run it directly with
//   pnpm tsx scripts/lib/sqlite.ts
// which writes data/dist/saudi-municipal-coding.sqlite.

import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { DIST_DIR } from './load.js';
import type { City, District, Region } from './load.js';

const SCHEMA = `
CREATE TABLE saudi_region (
  region_id INTEGER PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL
);

CREATE TABLE saudi_city (
  city_id INTEGER PRIMARY KEY,
  region_id INTEGER NOT NULL REFERENCES saudi_region (region_id),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL
);
CREATE INDEX idx_saudi_city_region ON saudi_city (region_id);

CREATE TABLE saudi_district (
  district_id INTEGER PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES saudi_city (city_id),
  region_id INTEGER NOT NULL REFERENCES saudi_region (region_id),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL
);
CREATE INDEX idx_saudi_district_region_city ON saudi_district (region_id, city_id);
CREATE INDEX idx_saudi_district_city ON saudi_district (city_id);
`;

function readDist<T>(file: string): T {
  return JSON.parse(readFileSync(join(DIST_DIR, file), 'utf8')) as T;
}

export function buildSqlite(outPath: string): void {
  const regions = readDist<Region[]>('regions.json');
  const cities = readDist<City[]>('cities.json');
  const districts = readDist<District[]>('districts.json');

  const db = new Database(outPath);
  db.pragma('journal_mode = WAL');
  db.exec(SCHEMA);

  const insertRegion = db.prepare(
    'INSERT INTO saudi_region (region_id, name_ar, name_en) VALUES (?, ?, ?)',
  );
  const insertCity = db.prepare(
    'INSERT INTO saudi_city (city_id, region_id, name_ar, name_en) VALUES (?, ?, ?, ?)',
  );
  const insertDistrict = db.prepare(
    'INSERT INTO saudi_district (district_id, city_id, region_id, name_ar, name_en) VALUES (?, ?, ?, ?, ?)',
  );

  const load = db.transaction(() => {
    for (const r of regions) {
      insertRegion.run(r.region_id, r.name_ar, r.name_en);
    }
    for (const c of cities) {
      insertCity.run(c.city_id, c.region_id, c.name_ar, c.name_en);
    }
    for (const d of districts) {
      insertDistrict.run(d.district_id, d.city_id, d.region_id, d.name_ar, d.name_en);
    }
  });
  load();
  db.close();
}

function main(): void {
  const outPath = join(DIST_DIR, 'saudi-municipal-coding.sqlite');
  buildSqlite(outPath);
  console.log(`Wrote ${outPath}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
