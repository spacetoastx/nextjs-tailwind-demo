import { NextApiRequest, NextApiResponse } from "next";
import { Issue } from "../../../entities/issues";

const issues = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  if (!query.owner || !query.repo || !query.page || !query.per_page) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  const response = await fetch(
    `https://api.github.com/repos/${query.owner}/${query.repo}/issues?page=${query.page}&per_page=${query.per_page}`
  );

  if (response.status !== 200) {
    console.error(response.statusText);
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  const data: Issue[] = await response.json();

  res.status(200).json(data);
};

export default issues;
