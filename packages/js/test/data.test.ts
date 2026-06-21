// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { cities, districts, regions } from '../src/data.js';
import {
  citiesInRegion,
  districtsInCity,
  findCity,
  findDistrict,
  findRegion,
} from '../src/lookup.js';

describe('bundled data', () => {
  it('has the expected counts', () => {
    expect(regions.length).toBe(13);
    expect(cities.length).toBe(15513);
    expect(districts.length).toBe(21235);
  });

  it('looks up region 1 (Riyadh) by id', () => {
    expect(findRegion(1)?.name_en).toBe('Riyadh');
    expect(findRegion(1)?.name_ar).toBe('الرياض');
  });

  it('looks up a city and a district by id', () => {
    const city = findCity(17743);
    expect(city?.name_en).toBe('Alsalil');
    expect(city?.region_id).toBe(1);

    const d = findDistrict(2510);
    expect(d).toBeDefined();
    expect(d?.city_id).toBe(16099);
    expect(d?.region_id).toBe(1);
  });

  it('lists districts in a city and cities in a region', () => {
    const inCity = districtsInCity(17743);
    expect(inCity.length).toBeGreaterThan(0);
    expect(inCity.every((d) => d.city_id === 17743)).toBe(true);

    const inRegion1 = citiesInRegion(1);
    expect(inRegion1.length).toBeGreaterThan(0);
    expect(inRegion1.every((c) => c.region_id === 1)).toBe(true);
  });

  it('has non-empty bilingual names everywhere and no Arabic in name_en', () => {
    const arabic = /[؀-ۿ]/;
    for (const d of districts) {
      expect(d.name_ar.length).toBeGreaterThan(0);
      expect(d.name_en.length).toBeGreaterThan(0);
      expect(arabic.test(d.name_en)).toBe(false);
    }
  });
});
