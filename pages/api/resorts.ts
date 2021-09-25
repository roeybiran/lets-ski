// https://github.com/JoshuaWise/better-sqlite3/blob/HEAD/docs/api.md

import Database from "better-sqlite3";
import { NextApiRequest, NextApiResponse } from "next";

const connection = new Database("resorts.db", { readonly: true });

export default (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q;
  if (typeof query !== "string" || query.length === 0) {
    res.status(400).json({ data: null, error: "empty or invalid query" });
    return;
  }
  const limit = typeof req.query.limit === "number" ? req.query.limit : 5;
  const offset = typeof req.query.offset === "number" ? req.query.offset : 0;

  const stmt = connection.prepare(`
  SELECT
    display_name,
    continent,
    country,
    state_or_province,
    url,
    altitude,
    avg_difficulty,
    avg_score
  FROM
    resorts
  WHERE
    name LIKE ?
  OR
    continent LIKE ?
  OR
    country LIKE ?
  OR
    state_or_province LIKE ?
  ORDER BY
    avg_score DESC,
    display_name ASC
  LIMIT ?
  OFFSET ?
  `);
  try {
    const data = stmt.all(
      ...Array(4)
        .fill(query.replace(/\W/, ""))
        .map(x => `%${x}%`),
      limit,
      offset
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
