import React, { useState } from 'react';
import { Heart, Crown, Music, Clock, MapPin, Star, ShoppingCart, X, Mail, Image, Upload, QrCode, Users, Download } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceEUR: number;
  priceILS: number;
  icon: React.ElementType;
  category: 'package' | 'addon';
  showFor?: 'essential' | 'prestige' | 'both';
  preview?: React.ReactNode;
}

interface DeliveryOption {
  id: string;
  name: string;
  priceEUR: number;
  priceILS: number;
  delay: string;
  discount?: number;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Livraison Standard',
    priceEUR: 0,
    priceILS: 0,
    delay: '3 semaines'
  },
  {
    id: 'express',
    name: 'Livraison Express',
    priceEUR: 149,
    priceILS: 596,
    delay: '3-4 jours'
  },
  {
    id: 'relaxed',
    name: 'Livraison "Pas Pressé"',
    priceEUR: 0,
    priceILS: 0,
    delay: '2 mois',
    discount: 10
  }
];

const services: Service[] = [
  {
    id: 'essential',
    name: 'Pack Essentiel',
    description: 'L\'essentiel pour votre site de mariage',
    features: [
      'Page d\'accueil personnalisée',
      'Information sur la cérémonie et la réception (lieux, horaires)',
      'Formulaire de confirmation de presence (RSVP)',
      'Design responsive compatible tablette et mobile',
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
      'Page d\'accueil personnalisée',
      'Information sur la cérémonie et la réception (lieux, horaires)',
      'Formulaire de confirmation de presence (RSVP)',
      'Boîte mail personnalisée',
      'Affichage du compte à rebours numérique',
      'Ajout d\'une musique d\'ambiance',
      'Lien direct vers l\'itinéraire Waze',
      'Design responsive compatible tablette et mobile'
    ],
    priceEUR: 499,
    priceILS: 1996,
    icon: Crown,
    category: 'package'
  },
  {
    id: 'playlist',
    name: 'Playlist Unique',
    description: 'Ajoutez une musique de fond à votre site pour plonger vos invités dans l\'ambiance de votre mariage',
    features: [
      'Personnalisation totale avec la chanson de votre choix',
      'Création d\'une atmosphère unique dès l\'arrivée sur le site'
    ],
    priceEUR: 79,
    priceILS: 316,
    icon: Music,
    category: 'addon',
    showFor: 'essential'
  },
  {
    id: 'countdown',
    name: 'Compte à Rebours',
    description: 'Ajoutez un compte à rebours dynamique pour faire monter l\'excitation à l\'approche du mariage',
    features: [
      'Affichage du temps restant en jours, heures et minutes',
      'Rappel visuel à chaque visite du site'
    ],
    priceEUR: 79,
    priceILS: 316,
    icon: Clock,
    category: 'addon',
    showFor: 'essential'
  },
  {
    id: 'directions',
    name: 'Plan d\'Accès',
    description: 'Facilitez l\'accès à votre lieu de mariage grâce à un lien interactif vers Waze',
    features: [
      'Redirection automatique vers l\'itinéraire',
      'Aide vos invités à arriver sans stress ni retard'
    ],
    priceEUR: 79,
    priceILS: 316,
    icon: MapPin,
    category: 'addon',
    showFor: 'essential'
  },
  {
    id: 'mailbox',
    name: 'Boîte Mail Personnalisée',
    description: 'Gérez facilement toutes vos communications avec vos invités grâce à une boîte mail dédiée',
    features: [
      'Adresse email personnalisée pour votre mariage',
      'Gestion centralisée de vos communications'
    ],
     priceEUR: 79,
    priceILS: 316,
    icon: Mail,
    category: 'addon',
    showFor: 'essential'
  },
  {
    id: 'photo-drive',
    name: 'Galerie Partagée',
    description: 'Créez une galerie collaborative pour partager les moments magiques de votre mariage',
    features: [
      'Upload instantané depuis tous les appareils',
      'Galerie en temps réel pendant la soirée',
      'Organisation automatique par moments clés',
      'Partage facile via QR code pour les invités',
      'Téléchargement haute qualité des photos',
      'Espace de stockage illimité'
    ],
    priceEUR: 299,
    priceILS: 1196,
    icon: Image,
    category: 'addon',
    showFor: 'prestige',
    preview: (
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Upload className="w-4 h-4" />
              <span className="text-sm">Upload instantané</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <QrCode className="w-4 h-4" />
              <span className="text-sm">Partage via QR code</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">Collaboration invités</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Download className="w-4 h-4" />
              <span className="text-sm">Téléchargement HD</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-sm overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Aperçu de l'interface de la galerie
        </div>
      </div>
    )
  }
];

function App() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [currency, setCurrency] = useState<'EUR' | 'ILS'>('EUR');
  const [showQuote, setShowQuote] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const removeFromCart = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    newSelected.delete(serviceId);
    setSelectedServices(newSelected);
  };

  const calculateServicesTotal = () => {
    return Array.from(selectedServices).reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (currency === 'EUR' ? service?.priceEUR || 0 : service?.priceILS || 0);
    }, 0);
  };

  const calculateTotal = () => {
    const servicesTotal = calculateServicesTotal();
    const delivery = deliveryOptions.find(d => d.id === selectedDelivery);
    
    if (!delivery) return servicesTotal;

    const deliveryPrice = currency === 'EUR' ? delivery.priceEUR : delivery.priceILS;
    let total = servicesTotal + deliveryPrice;

    if (delivery.discount) {
      total = total * (1 - delivery.discount / 100);
    }

    return Math.round(total);
  };

  const handleQuoteRequest = () => {
    const selectedServicesList = Array.from(selectedServices)
      .map(id => {
        const service = services.find(s => s.id === id);
        return service ? `${service.name} (${currency === 'EUR' ? `${service.priceEUR}€` : `${service.priceILS}₪`})` : '';
      })
      .filter(Boolean)
      .join('\n- ');

    const delivery = deliveryOptions.find(d => d.id === selectedDelivery);
    const total = calculateTotal();

    const message = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé(e) par les services suivants :\n- ${selectedServicesList}\n\nOption de livraison : ${delivery?.name} (délai : ${delivery?.delay})\n\nTotal : ${total} ${currency === 'EUR' ? '€' : '₪'}\n\nPouvez-vous me contacter pour plus d'informations ?`
    );

    window.location.href = `https://wa.me/972534387460?text=${message}`;
    setShowQuote(false);
  };

  const packages = services.filter(s => s.category === 'package');
  const addons = services.filter(s => s.category === 'addon');
  const isEssentialSelected = selectedServices.has('essential');
  const isPrestigeSelected = selectedServices.has('prestige');

  const getVisibleAddons = () => {
    if (isEssentialSelected) {
      return addons.filter(addon => addon.showFor === 'essential' || addon.showFor === 'both');
    }
    if (isPrestigeSelected) {
      return addons.filter(addon => addon.showFor === 'prestige' || addon.showFor === 'both');
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Shopping Cart Icon */}
      <div className="fixed top-6 left-6 z-30">
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-gold text-white p-3 rounded-full hover:bg-opacity-90 transition-all"
        >
          <ShoppingCart className="w-6 h-6" />
          {selectedServices.size > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {selectedServices.size}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl">Panier</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {selectedServices.size === 0 ? (
                <p className="text-gray-500 text-center py-8">Votre panier est vide</p>
              ) : (
                <div className="space-y-6">
                  {Array.from(selectedServices).map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    if (!service) return null;
                    return (
                      <div key={serviceId} className="flex justify-between items-start border-b border-gray-100 pb-4">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-500">{service.description}</p>
                          <p className="text-gold mt-2">
                            {currency === 'EUR' ? `${service.priceEUR} €` : `${service.priceILS} ₪`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(service.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between text-xl mb-8">
                <span>Total</span>
                <span className="text-gold">
                  {calculateTotal()} {currency === 'EUR' ? '€' : '₪'}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowCart(false);
                  setShowQuote(true);
                }}
                className="w-full bg-gold text-white py-3 hover:bg-opacity-90 transition-colors"
              >
                DEMANDER UN DEVIS
              </button>
            </div>
          </div>
        </div>
      )}

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
          src="/background4.jpg"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          {/* Add-ons Section */}
          {(isEssentialSelected || isPrestigeSelected) && (
            <div className="mt-24">
              <h2 className="text-3xl mb-16 text-center">Options Complémentaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getVisibleAddons().map((service) => (
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
                    {service.preview}
                    <div className="text-2xl text-gold font-light mt-6">
                      {currency === 'EUR'
                        ? `${service.priceEUR} €`
                        : `${service.priceILS} ₪`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quote Modal */}
      {showQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

            {/* Delivery Options */}
            <div className="mt-8 mb-8">
              <h4 className="text-lg font-medium mb-4">Options de livraison</h4>
              <div className="space-y-4">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDelivery === option.id
                        ? 'border-gold bg-gold/5'
                        : 'border-gray-200 hover:border-gold'
                    }`}
                    onClick={() => setSelectedDelivery(option.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{option.name}</span>
                      <span className="text-gold">
                        {option.id === 'relaxed' 
                          ? '-10%' 
                          : currency === 'EUR'
                            ? option.priceEUR > 0 ? `+${option.priceEUR} €` : 'Gratuit'
                            : option.priceILS > 0 ? `+${option.priceILS} ₪` : 'Gratuit'
                        }
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Délai : {option.delay}</p>
                  </div>
                ))}
              </div>
            </div>

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