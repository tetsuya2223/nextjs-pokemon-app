import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const apiRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    if (!apiRes.ok) throw new Error(`APIエラー: ${apiRes.status}`);

    const data = await apiRes.json();

    const pokemonList = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const detailRes = await fetch(pokemon.url);
        const detailData = await detailRes.json();

        return {
          name: detailData.name,
          image: detailData.sprites.front_default,
        };
      })
    );

    res.status(200).json(pokemonList);
  } catch {
    res.status(500).json({ error: "データ取得に失敗しました" });
  }
}
