<?php

// SPDX-License-Identifier: MIT

declare(strict_types=1);

namespace SaudiMunicipalCoding\Tests;

use PHPUnit\Framework\TestCase;
use SaudiMunicipalCoding\Dataset;

final class DatasetTest extends TestCase
{
    public function testCounts(): void
    {
        $this->assertCount(13, Dataset::regions());
        $this->assertCount(15513, Dataset::cities());
        $this->assertCount(21235, Dataset::districts());
    }

    public function testLookupByIdReturnsExpectedRecord(): void
    {
        $region = Dataset::findRegion(1);
        $this->assertNotNull($region);
        $this->assertSame('Riyadh', $region->name_en);
        $this->assertSame('الرياض', $region->name_ar);

        $district = Dataset::findDistrict(2510);
        $this->assertNotNull($district);
        $this->assertSame(16099, $district->city_id);
        $this->assertSame(1, $district->region_id);

        $this->assertNull(Dataset::findDistrict(999999999));
    }

    public function testReferentialIntegrity(): void
    {
        $regions = Dataset::regions();
        $cities = Dataset::cities();

        // Every city points to a known region.
        foreach ($cities as $city) {
            $this->assertArrayHasKey($city->region_id, $regions);
        }

        // Every district points to a known city and region that agree.
        foreach (Dataset::districts() as $district) {
            $this->assertArrayHasKey($district->city_id, $cities);
            $this->assertArrayHasKey($district->region_id, $regions);
            $this->assertSame($district->region_id, $cities[$district->city_id]->region_id);
        }
    }

    public function testTraversal(): void
    {
        $cities = Dataset::citiesInRegion(1);
        $this->assertNotEmpty($cities);
        foreach ($cities as $city) {
            $this->assertSame(1, $city->region_id);
        }

        $districts = Dataset::districtsInCity(17743);
        $this->assertNotEmpty($districts);
        foreach ($districts as $district) {
            $this->assertSame(17743, $district->city_id);
        }
    }

    public function testNamesArePresentAndEnglishHasNoArabic(): void
    {
        foreach (Dataset::districts() as $district) {
            $this->assertNotSame('', $district->name_ar);
            $this->assertNotSame('', $district->name_en);
            $this->assertSame(0, preg_match('/[\x{0600}-\x{06FF}]/u', $district->name_en));
        }
    }
}
