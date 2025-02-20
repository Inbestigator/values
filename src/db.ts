import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DB_URL as string,
  authToken: process.env.DB_TOKEN as string,
});

db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS countries (
        name TEXT PRIMARY KEY,
        flag TEXT
    );
    CREATE TABLE IF NOT EXISTS votes (
        id TEXT PRIMARY KEY,
        acheived TEXT,
        country TEXT,
        FOREIGN KEY (country) REFERENCES countries (name)
    );

    INSERT OR IGNORE INTO countries (name, flag) VALUES 
    ("usa", "🇺🇸"),
    ("germany", "🇩🇪"),
    ("china", "🇨🇳"),
    ("india", "🇮🇳"),
    ("brazil", "🇧🇷"),
    ("australia", "🇦🇺"),
    ("france", "🇫🇷"),
    ("japan", "🇯🇵"),
    ("south africa", "🇿🇦"),
    ("canada", "🇨🇦"),
    ("mexico", "🇲🇽");
`);

export default db;
