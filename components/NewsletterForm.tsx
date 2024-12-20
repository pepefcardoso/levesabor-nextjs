import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send email to backend
    console.log('Email submitted:', email);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-left mb-2">Nossa newsletter</h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 text-left mb-6">Cadastre-se e não perca nenhuma novidade</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        
        {/* Submit Button */}
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
