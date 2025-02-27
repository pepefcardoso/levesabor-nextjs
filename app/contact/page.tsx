// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CustomerContact, registerContact } from "../../services/contactService";
import { CONTACT_ITEMS } from "../../constants";
import { IconTextItem } from "../../components/Others/IconTextItem";
import CustomFormTextInput, { InputType } from "../../components/Inputs/CustomFormTextInput";
import CustomTextAreaInput from "../../components/Inputs/CustomTextAreaInput";
import CustomBackgroundTextButton from "../../components/Buttons/CustomBackgroundTextButton";

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
    <div className="container mx-auto px-6 py-8 max-w-4xl" style={{ minHeight: "85vh" }}>
      <h1 className="text-4xl font-bold mb-12">Entre em contato conosco</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Nossas informações</h2>
          <p className="text-gray-600 mb-6">Esperamos seu contato!</p>
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item, index) => (
              <IconTextItem key={index} icon={item.icon} text={item.text} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Mande sua mensagem</h2>
          <p className="text-gray-500 mb-4">Estamos sempre disponíveis!</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <CustomFormTextInput
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <CustomFormTextInput
              type={InputType.Tel}
              name="phone"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <CustomFormTextInput
              type={InputType.Email}
              name="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <CustomTextAreaInput
              name="message"
              placeholder="Como podemos ajudar?"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="flex justify-start">
              <CustomBackgroundTextButton
                text="Enviar mensagem"
                loading={submitting}
                loadingText="Enviando..."
                backgroundColor="bg-yellow-500"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;