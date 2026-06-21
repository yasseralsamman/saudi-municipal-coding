# Changelog

## v1.0.0 — 2026-06-21

Initial release.

- 13 regions, 15,513 cities, 21,235 districts.
- Bilingual (Arabic + English) names; independent integer IDs with foreign-key links.
- Outputs: JSON, CSV, MySQL, PostgreSQL, and SQLite (release asset).
- Packages: `saudi-municipal-coding` (npm), `yasseralsamman/saudi-municipal-coding`
  (Packagist).
- Source English names were cleaned (whitespace normalized; empty and Arabic-only English
  values corrected) so every record has a non-empty `name_ar` and `name_en`, with no
  Arabic remaining in any `name_en`.
