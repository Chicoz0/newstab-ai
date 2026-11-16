"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confete() {
  const [tamanho, setTamanho] = useState<{ width: number; height: number }>();

  useEffect(() => {
    const atualizar = () =>
      setTamanho({ width: window.innerWidth, height: window.innerHeight });

    atualizar();
    window.addEventListener("resize", atualizar, { passive: true });
    return () => window.removeEventListener("resize", atualizar);
  }, []);

  if (!tamanho) return null;

  return (
    <Confetti
      width={tamanho.width}
      height={tamanho.height}
      recycle={false}
      numberOfPieces={400}
      style={{ position: "fixed", pointerEvents: "none" }}
    />
  );
}
