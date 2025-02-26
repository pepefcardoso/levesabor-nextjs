import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createNewsletterCustomer } from '../services/NewsletterCustomerService';

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
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-left mb-2">Nossa newsletter</h2>
      <p className="text-sm text-gray-500 text-left mb-6">
        Cadastre-se e não perca nenhuma novidade
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-black font-semibold rounded-md hover:drop-shadow-lg transition duration-200"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;