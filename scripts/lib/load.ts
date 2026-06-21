// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/** Absolute path to the immutable source-data directory. */
export const SOURCE_DIR = resolve(here, '..', '..', 'data', 'source');
/** Absolute path to the generated-output directory. */
export const DIST_DIR = resolve(here, '..', '..', 'data', 'dist');
/** Repository root. */
export const REPO_ROOT = resolve(here, '..', '..');

/** One administrative region of Saudi Arabia. */
export interface Region {
  region_id: number;
  name_ar: string;
  name_en: string;
}

/** One city, linked to its region. */
export interface City {
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}

/** One district, linked to its city and region. */
export interface District {
  district_id: number;
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}

export interface SourceData {
  regions: Region[];
  cities: City[];
  districts: District[];
}

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(join(SOURCE_DIR, file), 'utf8')) as T;
}

/** Load the three immutable source files from `data/source/`. */
export function loadSource(): SourceData {
  return {
    regions: readJson<Region[]>('regions.json'),
    cities: readJson<City[]>('cities.json'),
    districts: readJson<District[]>('districts.json'),
  };
}
