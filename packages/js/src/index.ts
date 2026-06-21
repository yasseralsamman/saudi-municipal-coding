// SPDX-License-Identifier: MIT

export * from './types.js';
export { regions, cities, districts } from './data.js';
export {
  findRegion,
  findCity,
  findDistrict,
  citiesInRegion,
  districtsInCity,
  districtsInRegion,
} from './lookup.js';
