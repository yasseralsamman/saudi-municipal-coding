// SPDX-License-Identifier: MIT

/** One administrative region of Saudi Arabia. */
export interface Region {
  region_id: number;
  name_ar: string;
  name_en: string;
}

/** One city of Saudi Arabia, linked to its region. */
export interface City {
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}

/** One district of Saudi Arabia, linked to its city and region. */
export interface District {
  district_id: number;
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}
