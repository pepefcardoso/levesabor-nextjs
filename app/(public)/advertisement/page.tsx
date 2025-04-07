"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import { IconTextItem } from "@/components/Others/IconTextItem";
import { txtColors } from "@/constants/colors";
import { ADVERTISEMENTS_ITEMS } from "@/constants/index";
import { Typography } from "@/constants/typography";
import { CustomerContact } from "@/services/contactService";
import { contactService } from "@/services/index";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";

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
      await contactService.registerContact(formData);
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
    <div className="mx-auto px-8 py-12 max-w-4xl flex flex-col">
      <h1 className={clsx(Typography.Headline, "text-left w-full mb-6 sm:mb-8")}>Anuncie Conosco</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 md:gap-x-28">
        <div className="space-y-4 sm:space-y-6">
          {ADVERTISEMENTS_ITEMS.map((item, index) => (
            <IconTextItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>

        <div>
          <h2 className={clsx(Typography.Headline)}>Nossa equipe entrará em contato</h2>
          <p className={clsx(Typography.Caption, txtColors.gray700, "mb-4 sm:mb-6 mt-1")}>
            Não perca esta oportunidade!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <CustomTextInput
              type={InputType.Text}
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              required
            />

            <CustomTextInput
              type={InputType.Tel}
              name="phone"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              required
            />

            <CustomTextInput
              type={InputType.Email}
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              required
            />

            <FilledButton
              text="Converse Conosco"
              type="submit"
              disabled={submitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
