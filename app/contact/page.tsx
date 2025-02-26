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

const ContactUs = () => {
  const [formData, setFormData] = useState<CustomerContact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await registerContact(formData);
      toast.success("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="container mx-auto px-6 py-8 max-w-4xl"
      style={{ minHeight: "85vh" }}
    >
      <h1 className="text-4xl font-bold mb-12">Entre em contato conosco</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Nossas informações</h2>
          <p className="text-gray-600 mb-6">Esperamos seu contato!</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <IconBox icon="📱" />
              <span>(48) 99634-5124</span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="📷" />
              <span>@levesabor</span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="📷" />
              <span>@levesabor</span>
            </div>
            <div className="flex items-center space-x-3">
              <IconBox icon="📧" />
              <span>contato@levesabor.com.br</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Mande sua mensagem</h2>
          <p className="text-gray-500 mb-4">Estamos sempre disponíveis!</p>
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
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <textarea
              name="message"
              placeholder="Como podemos ajudar?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            ></textarea>
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={submitting}
                className="w-1/2 bg-yellow-500 text-black font-bold py-2 rounded-md shadow-md hover:bg-yellow-600 disabled:opacity-50"
              >
                {submitting ? "Enviando..." : "Enviar mensagem"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
