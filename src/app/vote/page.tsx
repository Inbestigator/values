"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { submitVote } from "./actions";
import { Country } from "../page";

export default function VotePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("/api/countries");
      setCountries(await res.json());
    }

    fetchCountries();
  }, []);

  function CountryButton({ country, text }: { country: string; text: string }) {
    const isSelected = selectedCountry === country;
    return (
      <button
        onClick={() => setSelectedCountry(country)}
        className={cn(
          "flex aspect-square items-center rounded-md bg-neutral-100 p-2 transition-all hover:opacity-80",
          isSelected && "bg-neutral-200 hover:opacity-100",
        )}
        disabled={isSelected}
      >
        {text}
      </button>
    );
  }

  return (
    <form
      action={submitVote}
      className="prose prose-sm mx-auto max-w-xl text-base"
    >
      <div className="h-12" />
      <p className="text-sm">
        Select all values that are supported and implemented by this country.
      </p>
      <Link
        href="/"
        className="not-prose flex size-fit items-center rounded-md bg-neutral-100 p-2 transition-all hover:opacity-80"
      >
        Home
      </Link>
      <ul className="p-0">
        {[
          "Rule of Law",
          "Human Rights Protection",
          "Access to Education",
          "Free & Universal Healthcare",
          "Social Safety Nets",
          "Economic Opportunity & Fair Wages",
          "Environmental Sustainability",
          "Political Freedom & Accountability",
          "Justice & Equality",
          "Digital Rights & Privacy",
        ].map((r, index) => (
          <Req key={index} name={r} index={index} />
        ))}
      </ul>
      <div className="mb-4 flex flex-wrap gap-4">
        {countries
          .sort((a, b) => {
            const lenDiff = b.acheived.length - a.acheived.length;
            if (lenDiff !== 0) {
              return lenDiff;
            }

            const sumA = a.acheived.reduce(
              (sum, num) => sum + Math.abs(num),
              0,
            );
            const sumB = b.acheived.reduce(
              (sum, num) => sum + Math.abs(num),
              0,
            );
            return sumA - sumB;
          })
          .map((country) => (
            <CountryButton
              key={country.name}
              country={country.name}
              text={country.flag}
            />
          ))}
      </div>
      <input
        type="hidden"
        name="country"
        value={selectedCountry ?? ""}
        required
      />
      <button
        type="submit"
        className="not-prose flex size-fit items-center rounded-md bg-neutral-100 p-2 transition-all hover:opacity-80"
        onClick={(e) => {
          if (!selectedCountry) {
            alert("Please select a country");
            e.preventDefault();
          }
        }}
      >
        Submit
      </button>
    </form>
  );
}

function Req({ name, index }: { name: string; index: number }) {
  return (
    <li className="group list-none">
      <div className="flex items-center gap-2">
        <input
          name={index.toString()}
          type="checkbox"
          className="rounded focus:ring-2 focus:ring-blue-600"
        />
        <h3 className="m-0 font-semibold">{name}</h3>
      </div>
    </li>
  );
}
