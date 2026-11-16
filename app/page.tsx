import { Suspense } from "react";
import Confete from "./confete";

const TABNEWS_URL = "https://www.tabnews.com.br";

async function buscarTotalDeConteudos(): Promise<number | null> {
  try {
    const resposta = await fetch(
      `${TABNEWS_URL}/api/v1/contents?strategy=new&per_page=1`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) },
    );
    if (!resposta.ok) return null;

    const total = Number(resposta.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) && total > 0 ? total : null;
  } catch {
    return null;
  }
}

async function TotalDeConteudos() {
  const total = await buscarTotalDeConteudos();

  if (total === null) {
    return "Não foi possível consultar o total de conteúdos do TabNews agora.";
  }

  return (
    <>
      Enquanto isso, o TabNews já soma{" "}
      <strong>{total.toLocaleString("pt-BR")}</strong> conteúdos publicados.
    </>
  );
}

export default function Home() {
  return (
    <main className="construcao">
      <Confete />

      <p className="selo">🚧 Em construção</p>

      <h1>
        Estamos neste momento reconstruindo o NewsTab, tijolo por tijolo e
        commit por commit. Volte em breve para ver o resultado!
      </h1>

      <p className="total">
        <Suspense fallback="Consultando o total de conteúdos do TabNews…">
          <TotalDeConteudos />
        </Suspense>
      </p>

      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Visitar o site oficial do TabNews →
      </a>
    </main>
  );
}
