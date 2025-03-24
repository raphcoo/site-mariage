import React, { useState } from 'react';
import { Heart, Crown, Music, Clock, MapPin, Mail, Star, Users } from 'lucide-react';



interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceEUR: number;
  priceILS: number;
  icon: React.ElementType;
  category: 'package' | 'addon';
}

const services: Service[] = [
  {
    id: 'essential',
    name: 'Pack Essentiel',
    description: 'L\'essentiel pour votre site de mariage',
    features: [
      'Page d\'accueil personnalisée',
      'RSVP interactif avec notifications',
      'Boîte mail personnalisée',
      'Design responsive',
      'Assistance technique'
    ],
    priceEUR: 199,
    priceILS: 796,
    icon: Heart,
    category: 'package'
  },
  {
    id: 'prestige',
    name: 'Pack Prestige',
    description: 'L\'expérience complète pour votre mariage',
    features: [
      'Page d\'accueil personnalisée premium',
      'RSVP interactif avec notifications',
      'Boîte mail personnalisée',
      'Design responsive exclusif',
      'Compte à rebours numérique',
      'Playlist personnalisée',
      'Page de remerciement élégante',
      'Support prioritaire'
    ],
    priceEUR: 499,
    priceILS: 1996,
    icon: Crown,
    category: 'package'
  },
  {
    id: 'playlist',
    name: 'Playlist Unique',
    description: 'Créez l\'ambiance de votre mariage',
    features: [
      'Interface de playlist intuitive',
      'Suggestions des invités',
      'Mode DJ pour la soirée',
      'Exportation vers Spotify',
      'Gestion des moments clés'
    ],
    priceEUR: 79,
    priceILS: 316,
    icon: Music,
    category: 'addon'
  },
  {
    id: 'countdown',
    name: 'Compte à Rebours',
    description: 'Créez l\'excitation avant le grand jour',
    features: [
      'Design personnalisable',
      'Animations élégantes',
      'Mode plein écran',
      'Notifications importantes',
      'Moments clés personnalisés'
    ],
    priceEUR: 59,
    priceILS: 236,
    icon: Clock,
    category: 'addon'
  },
  {
    id: 'directions',
    name: 'Plan d\'Accès',
    description: 'Guidez vos invités facilement',
    features: [
      'Intégration Waze & Google Maps',
      'Itinéraires personnalisés',
      'Points d\'intérêt',
      'Instructions détaillées',
      'Mode hors ligne'
    ],
    priceEUR: 69,
    priceILS: 276,
    icon: MapPin,
    category: 'addon'
  }
];

function App() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [currency, setCurrency] = useState<'EUR' | 'ILS'>('EUR');
  const [showQuote, setShowQuote] = useState(false);

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const calculateTotal = () => {
    return Array.from(selectedServices).reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (currency === 'EUR' ? service?.priceEUR || 0 : service?.priceILS || 0);
    }, 0);
  };

  const handleQuoteRequest = () => {
    const selectedServicesList = Array.from(selectedServices)
      .map(id => {
        const service = services.find(s => s.id === id);
        return service ? `${service.name} (${currency === 'EUR' ? `${service.priceEUR}€` : `${service.priceILS}₪`})` : '';
      })
      .filter(Boolean)
      .join('\n- ');

    const total = calculateTotal();
    const message = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé(e) par les services suivants :\n- ${selectedServicesList}\n\nTotal : ${total} ${currency === 'EUR' ? '€' : '₪'}\n\nPouvez-vous me contacter pour plus d'informations ?`
    );

    window.location.href = `https://wa.me/972534387460?text=${message}`;
    setShowQuote(false);
  };

  const packages = services.filter(s => s.category === 'package');
  const addons = services.filter(s => s.category === 'addon');

  return (
    <div className="min-h-screen bg-cream">
      {/* Currency Selector */}
      <div className="fixed top-6 right-6 z-30 flex gap-2">
        <button
          onClick={() => setCurrency('EUR')}
          className={`button-text px-4 py-2 text-sm transition-all ${
            currency === 'EUR'
              ? 'bg-gold text-white'
              : 'bg-white text-gold border border-gold hover:bg-gold hover:text-white'
          }`}
        >
          EUR (€)
        </button>
        <button
          onClick={() => setCurrency('ILS')}
          className={`button-text px-4 py-2 text-sm transition-all ${
            currency === 'ILS'
              ? 'bg-gold text-white'
              : 'bg-white text-gold border border-gold hover:bg-gold hover:text-white'
          }`}
        >
          ILS (₪)
        </button>
      </div>

      <header className="relative h-[90vh] overflow-hidden">
  <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
  <img
    src="./background4.jpg"
    alt="Wedding Background"
    className="absolute inset-0 w-full h-full object-cover object-center"
    style={{ objectPosition: 'center' }}
  />
  <div className="absolute inset-0 flex items-center z-20">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="max-w-3xl">
        <h1 className="hero-title text-6xl text-white mb-8">
          Votre site de mariage
        </h1>
        <p className="hero-description text-xl text-white mb-12 max-w-2xl">
          Créez votre site de mariage unique, élégant et interactif pour partager votre amour avec vos invités
        </p>
        <button
          onClick={() => setShowQuote(true)}
          className="button-text bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white border border-white/30 px-12 py-4 text-base transition-all transform hover:scale-105"
        >
          COMMENCEZ VOTRE HISTOIRE
        </button>
      </div>
    </div>
  </div>
</header>

      {/* Packages Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl mb-16 text-center">Nos Packs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {packages.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`bg-white p-8 cursor-pointer transition-all ${
                  selectedServices.has(service.id)
                    ? 'ring-2 ring-gold shadow-lg transform scale-[1.02]'
                    : 'hover:shadow-xl hover:transform hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <service.icon className="w-8 h-8 text-gold" />
                  {selectedServices.has(service.id) && (
                    <Star className="w-6 h-6 text-gold" />
                  )}
                </div>
                <h3 className="text-2xl mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-3xl text-gold font-light">
                  {currency === 'EUR'
                    ? `${service.priceEUR} €`
                    : `${service.priceILS} ₪`}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl mb-16 text-center">Options à la Carte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addons.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`bg-white p-8 cursor-pointer transition-all ${
                  selectedServices.has(service.id)
                    ? 'ring-2 ring-gold shadow-lg transform scale-[1.02]'
                    : 'hover:shadow-xl hover:transform hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <service.icon className="w-6 h-6 text-gold" />
                  {selectedServices.has(service.id) && (
                    <Star className="w-5 h-5 text-gold" />
                  )}
                </div>
                <h3 className="text-xl mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-2xl text-gold font-light">
                  {currency === 'EUR'
                    ? `${service.priceEUR} €`
                    : `${service.priceILS} ₪`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-12 max-w-2xl w-full">
            <h3 className="text-2xl mb-8">Votre Sélection</h3>
            {Array.from(selectedServices).map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              if (!service) return null;
              return (
                <div key={serviceId} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg">{service.name}</span>
                    <span className="font-medium text-gold">
                      {currency === 'EUR'
                        ? `${service.priceEUR} €`
                        : `${service.priceILS} ₪`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              );
            })}
            <div className="border-t border-gray-200 mt-8 pt-8">
              <div className="flex justify-between text-2xl">
                <span>Total</span>
                <span className="text-gold">
                  {calculateTotal()} {currency === 'EUR' ? '€' : '₪'}
                </span>
              </div>
            </div>
            <div className="mt-12 flex gap-4">
              <button
                onClick={() => setShowQuote(false)}
                className="button-text flex-1 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
              >
                FERMER
              </button>
              <button
                onClick={handleQuoteRequest}
                className="button-text flex-1 px-8 py-3 bg-gold text-white hover:bg-opacity-90 transition-colors"
              >
                DEMANDER UN DEVIS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl mb-6">Commencez Votre Histoire</h2>
          <p className="text-xl mb-12 text-gray-600">
            Créez un site de mariage aussi unique que votre amour
          </p>
          <button
            onClick={() => setShowQuote(true)}
            className="button-text bg-gold text-white px-12 py-4 hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            COMMENCER MAINTENANT
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;