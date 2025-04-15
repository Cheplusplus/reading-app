import Image from "next/image";
import Books from "../../../../public/zapread_bg.png";
import styles from "./background.module.css";

export default function Background() {
  return (
    <Image
      alt="Muted Grey Books"
      src={Books}
      placeholder="blur"
      quality={100}
      sizes="100vw"
      fill
      style={{
        objectFit: "fill",
      }}
    />
  );
}
