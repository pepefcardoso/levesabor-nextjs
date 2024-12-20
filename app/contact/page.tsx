"use client";

const IconBox = ({ icon }: { icon: string }) => (
  <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-md shadow-md">
    <span className="text-white text-lg">{icon}</span>
  </div>
);

const ContactUs = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" style={{ minHeight: "85vh" }}>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-12">Entre em contato conosco</h1> {/* Increased vertical gap here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
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
        {/* Form */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Mande sua mensagem</h2>
          <p className="text-gray-500 mb-4">Estamos sempre disponíveis!</p>
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
            <textarea
              placeholder="Como podemos ajudar?"
              rows={4}
              className="w-full border rounded-md p-2 shadow-md focus:ring focus:ring-green-300"
            ></textarea>
            <div className="flex justify-start">
              <button
                type="submit"
                className="w-1/2 bg-yellow-500 text-black font-bold py-2 rounded-md shadow-md hover:bg-yellow-600"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
