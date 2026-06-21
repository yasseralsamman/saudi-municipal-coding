<?php

// SPDX-License-Identifier: MIT

declare(strict_types=1);

namespace SaudiMunicipalCoding;

/** A readonly value object for one district. */
final class District
{
    public function __construct(
        public readonly int $district_id,
        public readonly int $city_id,
        public readonly int $region_id,
        public readonly string $name_ar,
        public readonly string $name_en,
    ) {
    }

    /** @param array<string,mixed> $row */
    public static function fromArray(array $row): self
    {
        return new self(
            (int) $row['district_id'],
            (int) $row['city_id'],
            (int) $row['region_id'],
            (string) $row['name_ar'],
            (string) $row['name_en'],
        );
    }
}
