import type { NextApiRequest, NextApiResponse } from "next";
import getResorts from "../../lib/getResorts";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resort[]>
) {
  const result = getResorts(req.query.q as string);
  console.log(result);

  res.status(200).json(result);
}
