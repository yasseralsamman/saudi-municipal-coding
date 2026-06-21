# yasseralsamman/saudi-municipal-coding

Open dataset of Saudi Arabia's **13 regions, 15,513 cities, and 21,235 districts**, from
the MOMRAH Unified Municipal Coding. Bilingual (Arabic + English) names with stable
integer IDs and foreign-key links. The data is bundled into the package, so there is no
HTTP fetch at runtime. Requires PHP 8.1+.

## Install

```sh
composer require yasseralsamman/saudi-municipal-coding
```

## Usage

### Load the data

```php
use SaudiMunicipalCoding\Dataset;

count(Dataset::regions());   // 13
count(Dataset::cities());    // 15513
count(Dataset::districts()); // 21235
```

`Dataset::regions()`, `cities()`, and `districts()` return arrays **keyed by id**, of
readonly `Region` / `City` / `District` value objects. They are read from the bundled
JSON files on first call and cached in memory.

### Look up a record by id

```php
use SaudiMunicipalCoding\Dataset;

Dataset::findRegion(1)?->name_en;     // 'Riyadh'
Dataset::findCity(17743)?->name_en;   // 'Alsalil'

$district = Dataset::findDistrict(2510);
$district?->city_id;     // 16099
$district?->region_id;   // 1
```

### Traverse the hierarchy

```php
use SaudiMunicipalCoding\Dataset;

Dataset::citiesInRegion(1);      // cities in Riyadh region (keyed by city_id)
Dataset::districtsInCity(17743); // districts in that city (keyed by district_id)
Dataset::districtsInRegion(1);   // districts in Riyadh region
```

## Data model

Region, City, and District each have an independent integer ID. Cities link to a region;
districts link to both a city and a region, and a district's `region_id` always equals its
city's region. Every record has a non-empty `name_ar` and `name_en`. There are no
coordinates, boundaries, or composite IDs — this is a lookup (coding) dataset.

## Links

- Repository & data dictionary: <https://github.com/yasseralsamman/saudi-municipal-coding>
- npm package: `saudi-municipal-coding`

## License

Code: MIT. Bundled data: CC0-1.0.
