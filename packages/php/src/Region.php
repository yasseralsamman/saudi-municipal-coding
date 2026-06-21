<?php

// SPDX-License-Identifier: MIT

declare(strict_types=1);

namespace SaudiMunicipalCoding;

/** A readonly value object for one administrative region. */
final class Region
{
    public function __construct(
        public readonly int $region_id,
        public readonly string $name_ar,
        public readonly string $name_en,
    ) {
    }

    /** @param array<string,mixed> $row */
    public static function fromArray(array $row): self
    {
        return new self(
            (int) $row['region_id'],
            (string) $row['name_ar'],
            (string) $row['name_en'],
        );
    }
}
