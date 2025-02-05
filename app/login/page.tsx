"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const success = await AuthService.login(email, password);
      if (success) {
        // Use Next.js router for smooth client-side navigation
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Falha no login. Verifique suas credenciais e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg mt-12 sm:mt-16">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo!</h1>
          <p className="text-gray-400 text-lg">
            Ainda não possui conta?{" "}
            <a href="/registrar" className="text-black hover:underline">
              Cadastre-se aqui
            </a>
          </p>
        </div>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <div className="text-lg text-right">
              <a href="/recuperar-senha" className="text-black hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center text-gray-600">
          <p className="text-lg">Ou continue com</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              {/* Add social login icons here */}
              <span className="sr-only">Google</span>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="sr-only">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}