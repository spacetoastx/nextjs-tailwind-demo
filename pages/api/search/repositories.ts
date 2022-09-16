import { NextApiRequest, NextApiResponse } from "next";
import { SearchRepositoriesResponse } from "../../../entities/repositories";

const repositories = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  if (!query.query || !query.page || !query.per_page) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query.query}&page=${query.page}&per_page=${query.per_page}`
  );

  if (response.status !== 200) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  const data: SearchRepositoriesResponse = await response.json();

  res.status(200).json(data);
};

export default repositories;
