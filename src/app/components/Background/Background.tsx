import Image from "next/image";
import Books from "../../../../public/zapread_bg.png";

export default function Background() {
  return (
    <Image
      data-testid="background"
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
