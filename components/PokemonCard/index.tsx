import Image from "next/image";
import styles from "./index.module.css";

/**
 * あとでAPIから取得したデータに差し替える
 * 不要な画像ファイルは削除する
 */
export default function PokemonCard() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src="/dummy-image.png"
            alt="ポケモン画像"
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.footer}>
          <h3 className={styles.name}>ポケモンの名前</h3>
        </div>
      </div>
    </div>
  );
}
