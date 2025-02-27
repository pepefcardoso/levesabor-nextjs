"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CustomerContact,
  registerContact,
} from "../../services/contactService";

const IconBox = ({ icon }: { icon: string }) => (
  <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-md shadow-md">
    <span className="text-white text-lg">{icon}</span>
  </div>
);

const Advertisement = () => {
  const [formData, setFormData] = useState<CustomerContact>({
    name: "",
    email: "",
    phone: "",
    message: "Desejo contato do Marketing",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await registerContact(formData);
      toast.success("Solicitação enviada com sucesso!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "Desejo contato do Marketing",
      });
    } catch {
      toast.error("Erro ao enviar solicitação. Por favor, tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl"
      style={{ minHeight: "85vh" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-left">
        Anuncie Conosco
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16 md:gap-x-28">
        <div>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <IconBox icon="👥" />
              <span className="text-sm sm:text-base">
                +500 Usuários ativos por mês
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="📈" />
              <span className="text-sm sm:text-base">
                +2000 Acessos diários
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="⏰" />
              <span className="text-sm sm:text-base">
                Exposição 24 horas, 7 dias
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="🌱" />
              <span className="text-sm sm:text-base">Marketing orgânico</span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="📝" />
              <span className="text-sm sm:text-base">
                Conteúdo relevante e atualizado
              </span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Nossa equipe entrará em contato
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            Não perca esta oportunidade!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={submitting}
                className="w-1/2 bg-yellow-500 text-black font-bold py-2 rounded-md shadow-md hover:bg-yellow-600 disabled:opacity-50"
              >
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
