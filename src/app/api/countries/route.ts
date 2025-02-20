import db from "@/db";
import { NextResponse } from "next/server";

interface DBCountry {
  name: string;
  acheived: number[][];
  flag: string;
}

export async function GET() {
  const countries = (
    await db.execute(`
        SELECT c.name, c.flag, (
            SELECT json_group_array(DISTINCT v.acheived)
            FROM votes v
            WHERE v.country = c.name
        ) as acheived
        FROM countries c
    `)
  ).rows.map((c) => {
    return {
      name: c.name,
      flag: c.flag,
      acheived: JSON.parse(c.acheived as string).map(JSON.parse),
    };
  }) as DBCountry[];

  const filtered = countries.map((c) => {
    const numberVotesCount: Record<number, Set<number>> = {};

    c.acheived.forEach((subArray, index) => {
      subArray.forEach((num) => {
        if (!numberVotesCount[num]) {
          numberVotesCount[num] = new Set();
        }
        numberVotesCount[num].add(index);
      });
    });

    const threshold = 0.4 * c.acheived.length;

    const useDupes = Object.keys(numberVotesCount)
      .map(Number)
      .filter((num) => (numberVotesCount[num]?.size ?? 0) >= threshold);

    return {
      ...c,
      acheived: useDupes,
    };
  });

  return new NextResponse(JSON.stringify(filtered));
}
