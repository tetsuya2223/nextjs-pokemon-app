"use client";

import Image from "next/image";
import styles from "./index.module.css";
import { useState, useEffect } from "react";

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState<{ name: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/pokemon");

        if (!res.ok) {
          throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        setPokemon(data);
      } catch {
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []);

  if (loading) {
    return <p>データ取得中...</p>;
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      {pokemon.map((p, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={p.image}
              alt={`ポケモン ${p.name}の画像`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
          <h3 className={styles.name}>{p.name}</h3>
        </div>
      ))}
    </div>
  );
}
