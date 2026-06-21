// SPDX-License-Identifier: MIT
//
// CSV generation. Flat columns, one row per record. UTF-8 with a header row.

import { stringify } from 'csv-stringify/sync';
import type { City, District, Region } from './load.js';

export function regionsCsv(regions: Region[]): string {
  const rows = regions.map((r) => ({
    region_id: r.region_id,
    name_ar: r.name_ar,
    name_en: r.name_en,
  }));
  return stringify(rows, { header: true });
}

export function citiesCsv(cities: City[]): string {
  const rows = cities.map((c) => ({
    city_id: c.city_id,
    region_id: c.region_id,
    name_ar: c.name_ar,
    name_en: c.name_en,
  }));
  return stringify(rows, { header: true });
}

export function districtsCsv(districts: District[]): string {
  const rows = districts.map((d) => ({
    district_id: d.district_id,
    city_id: d.city_id,
    region_id: d.region_id,
    name_ar: d.name_ar,
    name_en: d.name_en,
  }));
  return stringify(rows, { header: true });
}
