"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CustomerContact,
  registerContact,
} from "../../services/contactService";
import { ADVERTISEMENTS_ITEMS } from "../../constants";
import CustomBackgroundTextButton from "../../components/Buttons/CustomBackgroundTextButton";
import CustomTextInput, { InputType } from "../../components/Inputs/CustomTextInput";
import { IconTextItem } from "../../components/Others/IconTextItem";

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
            {ADVERTISEMENTS_ITEMS.map((item, index) => (
              <IconTextItem key={index} icon={item.icon} text={item.text} />
            ))}
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
            <CustomTextInput
              type={InputType.Text}
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <CustomTextInput
              type={InputType.Tel}
              name="phone"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <CustomTextInput
              type={InputType.Email}
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <CustomBackgroundTextButton
              text="Converse Conosco"
              loading={submitting}
              loadingText="Enviando..."
              backgroundColor="#F59E0B"
            />

          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
