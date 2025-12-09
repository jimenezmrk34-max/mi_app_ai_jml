import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
        <div className="bg-emerald-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="text-emerald-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">¡Mensaje Enviado!</h2>
        <p className="text-stone-600 mb-8">
          Gracias por contactar al equipo de JML. Hemos recibido tu mensaje y un representante se pondrá en contacto contigo a la brevedad.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-emerald-800 text-white px-6 py-2 rounded-lg hover:bg-emerald-900 transition-colors shadow-lg"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="bg-emerald-900 text-stone-100 p-8 rounded-xl shadow-lg h-full flex flex-col justify-between border-t-4 border-amber-500">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
            <p className="text-emerald-100 mb-8">
              Estamos aquí para ayudarte a optimizar tu negocio con JML. Contáctanos para soporte técnico o ventas.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="text-amber-500 mt-1" size={20} />
                <div>
                  <p className="font-medium text-white">Llámanos</p>
                  <p className="text-emerald-200">+507 1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="text-amber-500 mt-1" size={20} />
                <div>
                  <p className="font-medium text-white">Escríbenos</p>
                  <p className="text-emerald-200">soporte@jmlsystem.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="text-amber-500 mt-1" size={20} />
                <div>
                  <p className="font-medium text-white">Oficina Principal</p>
                  <p className="text-emerald-200">Ciudad de Panamá, Panamá</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
             <div className="flex space-x-4 text-emerald-300">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white cursor-pointer transition-colors">FB</div>
               <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white cursor-pointer transition-colors">TW</div>
               <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white cursor-pointer transition-colors">IG</div>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-stone-200">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Envíanos un mensaje</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre Completo</label>
                <input required type="text" className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre del Negocio</label>
                <input type="text" className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Minisúper El Éxito" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Correo Electrónico</label>
                <input required type="email" className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="+507 6000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Asunto</label>
              <select className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                <option>Soporte Técnico</option>
                <option>Consulta de Ventas</option>
                <option>Reportar un Error</option>
                <option>Sugerencias</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Mensaje</label>
              <textarea required rows={4} className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="¿En qué podemos ayudarte hoy?"></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto bg-emerald-800 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-emerald-900 transition-colors flex items-center justify-center disabled:opacity-70 border border-emerald-900"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <>
                    <Send size={20} className="mr-2 text-amber-400" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};