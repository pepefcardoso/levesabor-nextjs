// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CustomerContact, registerContact } from "../../services/contactService";
import { CONTACT_ITEMS } from "../../constants";
import { IconTextItem } from "../../components/Others/IconTextItem";
import CustomTextInput, { InputType } from "../../components/Inputs/CustomTextInput";
import CustomTextAreaInput from "../../components/Inputs/CustomTextAreaInput";
import FilledButton from "../../components/Buttons/FilledButton";
import { bgColors, txtColors } from "../../constants/colors";
import clsx from "clsx";
import { Typography } from "../../constants/typography";
import { FilledButtonHovers } from "../../typings/buttons";

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
    <div className="mx-auto px-8 py-12 max-w-4xl flex flex-col">

      <h1 className={clsx(
        Typography.Title,
        txtColors.black,
        "text-left w-full mb-6 sm:mb-8"
      )}>Entre em contato conosco</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className={clsx(
            Typography.Title2
          )}>Nossas informações</h2>

          <p className={clsx(
            Typography.Body2,
            txtColors.gray500,
            "mb-2 sm:mb-4 mt-1"
          )}>Esperamos seu contato!</p>

          <div className="space-y-4 sm:space-y-6">
            {CONTACT_ITEMS.map((item, index) => (
              <IconTextItem key={index} icon={item.icon} text={item.text} />
            ))}
          </div>

        </div>

        <div>
          <h2 className={clsx(
            Typography.Title2
          )}>Mande sua mensagem</h2>

          <p className={clsx(
            Typography.Body2,
            txtColors.gray500,
            "mb-2 sm:mb-4 mt-1"
          )}>Estamos sempre disponíveis!</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <CustomTextInput
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

            <FilledButton
              text="Enviar mensagem"
              disabled={submitting}
              color={bgColors.tertiary}
              hoverAnimation={FilledButtonHovers.opacity}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;