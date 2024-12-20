"use client";

const IconBox = ({ icon }: { icon: string }) => (
  <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-md shadow-md">
    <span className="text-white text-lg">{icon}</span>
  </div>
);

const Advertisement = () => {
  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl" // Larger width
      style={{ minHeight: "85vh" }}
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-left">
        Anuncie Conosco
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16 md:gap-x-28"> {/* Larger gaps */}
        {/* Advertising Information */}
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

        {/* Form */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Nossa equipe entrará em contato
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            Não perca esta oportunidade!
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <input
              type="email"
              placeholder="Seu email"
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            />
            <div className="flex justify-start">
              <button
                type="submit"
                className="w-1/2 bg-yellow-500 text-black font-bold py-2 rounded-md shadow-md hover:bg-yellow-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
