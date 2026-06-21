# Source data (canonical, immutable)

`regions.json`, `cities.json`, and `districts.json` are the **source of truth**
for this repository. Every generated artifact (in `data/dist/`, the JS/PHP
packages, CSV/SQL/SQLite) is derived from these three files.

## Shapes

```jsonc
// regions.json   — 13 records
{ "region_id": 1, "name_ar": "الرياض", "name_en": "Riyadh" }

// cities.json    — 15,513 records
{ "city_id": 17743, "region_id": 1, "name_ar": "السليل", "name_en": "Alsalil" }

// districts.json — 21,235 records
{ "district_id": 2510, "city_id": 16099, "region_id": 1,
  "name_ar": "مخطط رقم 232", "name_en": "Planned District Number 232" }
```

- IDs are independent integers with foreign-key links (`city.region_id`,
  `district.city_id`, `district.region_id`). `district.region_id` always equals
  its city's `region_id`.
- Both `name_ar` and `name_en` are always present and non-empty.
- Records are sorted ascending by their ID.

## Notes

These files are the curated, cleaned canonical input. The raw upstream English
names had quality issues (empty values, Arabic text in the English field, stray
whitespace and diacritics); all have been normalized so that every record has a
non-empty `name_ar` and `name_en`, with no Arabic remaining in any `name_en`.

Do not hand-edit these files to tune downstream output. Correct the data here,
then re-run the build.
