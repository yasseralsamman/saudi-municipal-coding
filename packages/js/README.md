# saudi-municipal-coding

Open dataset of Saudi Arabia's **13 regions, 15,513 cities, and 21,235 districts**, from
the MOMRAH Unified Municipal Coding. Bilingual (Arabic + English) names with stable
integer IDs and foreign-key links. The data is bundled into the package, so there is no
HTTP fetch at runtime. Ships as dual ESM + CJS with TypeScript types.

## Install

```sh
npm install saudi-municipal-coding
# or: pnpm add saudi-municipal-coding / yarn add saudi-municipal-coding
```

## Usage

### Load the data

```ts
import { regions, cities, districts } from 'saudi-municipal-coding';

regions.length;   // 13
cities.length;    // 15513
districts.length; // 21235

regions[0]; // { region_id: 1, name_ar: 'الرياض', name_en: 'Riyadh' }
```

### Look up a record by id

```ts
import { findRegion, findCity, findDistrict } from 'saudi-municipal-coding';

findRegion(1)?.name_en;      // 'Riyadh'
findCity(17743)?.name_en;    // 'Alsalil'
findDistrict(2510);
// → { district_id: 2510, city_id: 16099, region_id: 1, name_ar: '…', name_en: 'Planned District Number 232' }
```

### Traverse the hierarchy

```ts
import { citiesInRegion, districtsInCity, districtsInRegion } from 'saudi-municipal-coding';

citiesInRegion(1);      // all cities in Riyadh region
districtsInCity(17743); // all districts in that city
districtsInRegion(1);   // all districts in Riyadh region
```

## Data model

Region, City, and District each have an independent integer ID. Cities link to a region
(`region_id`); districts link to both a city (`city_id`) and a region (`region_id`), and a
district's `region_id` always equals its city's region. Every record has a non-empty
`name_ar` and `name_en`.

There are **no** coordinates, boundaries, or composite/encoded IDs — this is a lookup
(coding) dataset.

## Links

- Repository & data dictionary: <https://github.com/yasseralsamman/saudi-municipal-coding>
- PHP package: `yasseralsamman/saudi-municipal-coding` on Packagist

## License

Code: MIT. Bundled data: CC0-1.0.
