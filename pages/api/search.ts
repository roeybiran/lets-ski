import type { NextApiRequest, NextApiResponse } from "next";
import getResorts from "../../lib/getResorts";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(getResorts());

  res.status(200).json({ name: "John Doe" });
}
