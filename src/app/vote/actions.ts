"use server";
import db from "@/db";
import { redirect } from "next/navigation";

const validCountries = [
  "usa",
  "germany",
  "china",
  "india",
  "brazil",
  "australia",
  "france",
  "japan",
  "south africa",
  "canada",
  "mexico",
];

export async function submitVote(e: FormData) {
  const country = e.get("country");
  const law = e.get("0") !== null;
  const rights = e.get("1");
  const education = e.get("2");
  const healthcare = e.get("3");
  const safety = e.get("4");
  const wages = e.get("5");
  const environment = e.get("6");
  const freedom = e.get("7");
  const justice = e.get("8");
  if (
    !country ||
    typeof country !== "string" ||
    !validCountries.includes(country)
  ) {
    throw new Error("Invalid country");
  }
  const achieved = JSON.stringify(
    [
      law ? 0 : -1,
      rights ? 1 : -1,
      education ? 2 : -1,
      healthcare ? 3 : -1,
      safety ? 4 : -1,
      wages ? 5 : -1,
      environment ? 6 : -1,
      freedom ? 7 : -1,
      justice ? 8 : -1,
    ].filter((i) => i !== -1),
  );
  await db.execute({
    sql: "INSERT INTO votes (id, acheived, country) VALUES (?, ?, ?)",
    args: [crypto.randomUUID(), achieved, country],
  });

  redirect("/");
}
