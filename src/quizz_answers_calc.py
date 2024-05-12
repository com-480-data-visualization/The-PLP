import json
import os
import sys



biggestGunDeaths = 0
smallestGunDeaths = float("+inf")

biggestGunDeathsCountry = None
smallestGunDeathsCountry = None

with open("./assets/data/gun-deaths-by-country-2024.json", "r") as f:
    gunDeatthsData = json.load(f)

    for country_stats in gunDeatthsData:
        country = country_stats["country"]
        gunDeaths = country_stats["GunDeathsViolentRatePer100k2019"]

        if gunDeaths is None:
            continue

        if gunDeaths > biggestGunDeaths:
            biggestGunDeaths = gunDeaths
            biggestGunDeathsCountry = country
        if gunDeaths < smallestGunDeaths:
            smallestGunDeaths = gunDeaths
            smallestGunDeathsCountry = country

print(f"The country with the biggest gun deaths is {biggestGunDeathsCountry} with {biggestGunDeaths} violent deaths per 100k")
print(f"The country with the smallest gun deaths is {smallestGunDeathsCountry} with {smallestGunDeaths} violent deaths per 100k")


biggestGunOwnershipPer100 = 0
biggestGunOwnershipPer100Country = None

smallestGunOwnershipPer100 = float("+inf")
smallestGunOwnershipPer100Country = None
with open("./assets/data/gun-ownership-by-country-2024.json", "r") as f:
    gunOwnershipData = json.load(f)

    for country_stats in gunOwnershipData:
        country = country_stats["country"]
        gunOwnership = country_stats["gunOwnershipByCountry_per100"]

        if gunOwnership > biggestGunOwnershipPer100:
            biggestGunOwnershipPer100 = gunOwnership
            biggestGunOwnershipPer100Country = country
        if gunOwnership < smallestGunOwnershipPer100:
            smallestGunOwnershipPer100 = gunOwnership
            smallestGunOwnershipPer100Country = country

print()
print(80 * "-")
print()
print(f"The country with the biggest gun ownership is {biggestGunOwnershipPer100Country} with {biggestGunOwnershipPer100} guns per 100 people")
print(f"The country with the smallest gun ownership is {smallestGunOwnershipPer100Country} with {smallestGunOwnershipPer100} guns per 100 people")