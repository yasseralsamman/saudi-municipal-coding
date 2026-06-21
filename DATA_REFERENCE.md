# Saudi Unified Municipal Coding — Data Reference

The dataset describes Saudi Arabia's administrative hierarchy — **Region → City →
District** — with bilingual names and stable integer identifiers. It is a lookup
(coding) dataset: there are no coordinates, boundaries, or composite IDs.

- 13 regions
- 15,513 cities
- 21,235 districts

## 1. File schemas

The canonical files live in `data/source/`; identical copies (generated) are in
`data/dist/` and bundled into the packages. JSON Schemas are in `schemas/`.

### `regions.json`

```jsonc
{ "region_id": 1, "name_ar": "الرياض", "name_en": "Riyadh" }
```

| Field | Type | Notes |
|-------|------|-------|
| `region_id` | integer | 1–13, unique |
| `name_ar` | string | non-empty |
| `name_en` | string | non-empty, no Arabic characters |

### `cities.json`

```jsonc
{ "city_id": 17743, "region_id": 1, "name_ar": "السليل", "name_en": "Alsalil" }
```

| Field | Type | Notes |
|-------|------|-------|
| `city_id` | integer | unique |
| `region_id` | integer | FK → `regions.region_id` |
| `name_ar` / `name_en` | string | non-empty |

### `districts.json`

```jsonc
{ "district_id": 2510, "city_id": 16099, "region_id": 1,
  "name_ar": "مخطط رقم 232", "name_en": "Planned District Number 232" }
```

| Field | Type | Notes |
|-------|------|-------|
| `district_id` | integer | unique |
| `city_id` | integer | FK → `cities.city_id` |
| `region_id` | integer | FK → `regions.region_id`; equals the city's region |
| `name_ar` / `name_en` | string | non-empty |

## 2. The ID model

`region_id`, `city_id`, and `district_id` are **independent integer identifiers** — not
composite or encoded. Relationships are expressed only through the foreign-key fields.
A district carries both `city_id` and `region_id`; its `region_id` always matches its
city's `region_id`.

District names are **not** unique on their own: the same district name can appear in
different cities, and (rarely) twice within one city. The `district_id` is the only
unique key for a district.

## 3. Referential integrity

Every build runs `scripts/validate.ts`, which enforces:

- exactly 13 regions; unique `region_id` / `city_id` / `district_id`;
- every `city.region_id`, `district.city_id`, and `district.region_id` resolves;
- `district.region_id == city.region_id`;
- non-empty `name_ar` and `name_en` on every record, with no Arabic characters in any
  `name_en`.

Within-city duplicate district names are reported as warnings only (they are valid).

## 4. Generated formats

`pnpm run build` writes to `data/dist/`:

| File | Description |
|------|-------------|
| `regions.json`, `cities.json`, `districts.json` | bare JSON arrays |
| `regions.csv`, `cities.csv`, `districts.csv` | flat CSV with header |
| `mysql.sql`, `postgres.sql` | self-contained schema + data dumps |
| `saudi-municipal-coding.sqlite` | SQLite database (release asset only) |

SQL/SQLite tables are `saudi_region`, `saudi_city`, `saudi_district` with the same
foreign keys described above.
