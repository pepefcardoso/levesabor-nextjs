"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createNewsletterCustomer } from '../../services/NewsletterCustomerService';
import CustomTextInput, { InputType } from '../Inputs/CustomTextInput';
import CustomBackgroundTextButton from '../Buttons/CustomBackgroundTextButton';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      await createNewsletterCustomer(formData);
      setEmail('');
      toast.success('Cadastro realizado com sucesso!', { position: 'bottom-left' });
    } catch (error) {
      let errorMessage = 'Erro ao cadastrar. Tente novamente.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { position: 'bottom-left' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-left mb-2">Nossa newsletter</h2>
      <p className="text-sm text-gray-500 text-left mb-6">
        Cadastre-se e não perca nenhuma novidade
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <CustomTextInput
          type={InputType.Email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          required
        />
        <CustomBackgroundTextButton
          type="submit"
          text="Cadastrar"
          backgroundColor="bg-yellow-500"
          fontColor="text-black"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default NewsletterForm;