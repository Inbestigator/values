"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Country {
  name: string;
  acheived: number[];
  flag: string;
}

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [checks, setChecks] = useState<boolean[]>(new Array(9).fill(false));
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
        onClick={() => {
          setSelectedCountry(country);
          const newChecks = new Array(9).fill(false);
          const found = countries.find((c) => c.name === country);
          found?.acheived.forEach((index) => (newChecks[index] = true));
          setChecks(newChecks);
        }}
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
    <main className="prose prose-sm mx-auto max-w-xl text-base">
      <div className="h-12" />
      <p className="text-sm">
        See voting results for the progress of these fundamental values.
      </p>
      <Link
        href="/vote"
        className="not-prose flex size-fit items-center rounded-md bg-neutral-100 p-2 transition-all hover:opacity-80"
      >
        Vote
      </Link>
      <ul className="p-0">
        <Req
          name="Rule of Law"
          description="Ensure that laws are applied equally to all citizens, with a transparent and impartial judicial system that enforces legal rights and resolves disputes."
          checked={!!checks[0]}
        />
        <Req
          name="Human Rights Protection"
          description="Guarantee fundamental human rights, such as freedom of speech, freedom of assembly, and protection from discrimination. Ensure that all citizens are protected from discrimination, harassment, and violence."
          checked={!!checks[1]}
        />
        <Req
          name="Access to Education"
          description="Provide free or affordable, high-quality education for all citizens. Focus on promoting critical thinking, creativity, and lifelong learning opportunities for every individual."
          checked={!!checks[2]}
        />
        <Req
          name="Free & Universal Healthcare"
          description="Ensure access to healthcare services for all citizens, including preventive care, treatments for illness, and mental health support. Focus on equity in healthcare access and outcomes."
          checked={!!checks[3]}
        />
        <Req
          name="Social Safety Nets"
          description="Establish a robust safety net to provide support in times of need. This includes unemployment benefits, disability assistance, and pension plans to prevent individuals and families from falling into poverty."
          checked={!!checks[4]}
        />
        <Req
          name="Economic Opportunity & Fair Wages"
          description="Create an economy that fosters job opportunities, fair wages, and upward mobility for all citizens. Ensure that labor rights are protected, and exploitative practices are prevented."
          checked={!!checks[5]}
        />
        <Req
          name="Environmental Sustainability"
          description="Prioritize environmental conservation by reducing pollution, conserving natural resources, and combating climate change. Encourage sustainable development that meets current needs without compromising the future."
          checked={!!checks[6]}
        />
        <Req
          name="Political Freedom & Accountability"
          description="Hold free and fair elections to allow citizens to participate in decision-making. Ensure transparency, accountability, and checks and balances in governance to maintain trust in political systems."
          checked={!!checks[7]}
        />
        <Req
          name="Justice & Equality"
          description="Work toward achieving social justice by addressing inequality in all forms—economic, racial, gender, etc. Ensure equal opportunities and rights for all individuals regardless of their background."
          checked={!!checks[8]}
        />
        <Req
          name="Digital Rights & Privacy"
          description="Protect citizens' digital rights, including privacy, data security, and freedom of expression online. Ensure that individuals' personal information is safeguarded from misuse or unauthorized surveillance."
          checked={!!checks[9]}
        />
      </ul>
      <div className="flex flex-wrap gap-4">
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
    </main>
  );
}

function Req({
  name,
  description,
  checked,
}: {
  name: string;
  description: string;
  checked: boolean;
}) {
  return (
    <li className="group list-none">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="rounded focus:ring-2 focus:ring-blue-600"
          checked={checked}
          disabled
        />
        <h3 className="m-0 font-semibold">{name}</h3>
      </div>
      <div className="ml-4 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-screen">
        <div className="rounded-lg border bg-white p-2 text-sm text-gray-700">
          {description}
        </div>
      </div>
    </li>
  );
}
