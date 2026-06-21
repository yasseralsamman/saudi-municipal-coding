// SPDX-License-Identifier: MIT
//
// The bundled dataset. The three JSON files are resolved and inlined by the
// bundler (tsup) and by vitest; `tsc` does not type them, so each import is
// suppressed and the runtime values are cast to the hand-written types.

// @ts-expect-error - bundled JSON, loaded by the bundler, not typed by tsc.
import citiesData from '../data/cities.json' with { type: 'json' };
// @ts-expect-error - bundled JSON, loaded by the bundler, not typed by tsc.
import districtsData from '../data/districts.json' with { type: 'json' };
// @ts-expect-error - bundled JSON, loaded by the bundler, not typed by tsc.
import regionsData from '../data/regions.json' with { type: 'json' };
import type { City, District, Region } from './types.js';

export const regions = regionsData as readonly Region[];
export const cities = citiesData as readonly City[];
export const districts = districtsData as readonly District[];
