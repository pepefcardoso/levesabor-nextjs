import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Página não encontrada
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "40px" }}>
        A página que você está procurando não existe.
      </p>
      <Link href="/">
        <button
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Voltar para a página inicial
        </button>
      </Link>
    </div>
  );
}