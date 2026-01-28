import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Calendar, Check, ChevronLeft, ChevronRight, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HouseCard from '@/components/HouseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProperty } from '@/context/PropertyContext';
import { toast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = "919834132567"; 
// example: 919876543210 (NO +, NO spaces)


const RentalDetail = () => {
  const { id } = useParams();
  const { houses } = useProperty();
  const house = houses.find(h => h.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!house) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <div className="container-custom section-padding text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Rental Not Found</h1>
            <p className="text-muted-foreground mb-8">The rental you're looking for doesn't exist.</p>
            <Link to="/rentals">
              <Button className="btn-gradient">Browse All Rentals</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarHouses = houses.filter(h => h.id !== house.id && h.bedrooms === house.bedrooms).slice(0, 3);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const whatsappMessage = `
Hello, I am interested in this rental property.

🏠 *Property*: ${house.title}
📍 *Location*: ${house.location}
💰 *Rent*: ₹${house.monthlyRent.toLocaleString()}/month

👤 *Name*: ${formData.name}
📞 *Phone*: ${formData.phone}
📧 *Email*: ${formData.email}

📝 *Message*:
${formData.message || "Please contact me for more details."}
  `.trim();

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");

  toast({
    title: "Redirecting to WhatsApp",
    description: "Please send the message to complete your inquiry.",
  });

  setFormData({ name: '', email: '', phone: '', message: '' });
};


  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % house.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + house.images.length) % house.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container-custom section-padding">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/rentals" className="hover:text-primary">Rentals</Link>
            <span>/</span>
            <span className="text-white">{house.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-card">
            <img
              src={house.images[currentImage] || '/placeholder.svg'}
              alt={house.title}
              className="w-full h-full object-cover"
            />
            {house.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full">
                {house.furnishing}
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">{house.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{house.location}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-bold gradient-text">
                    ${house.monthlyRent.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                  <div className="font-semibold">{house.bedrooms}</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                  <div className="font-semibold">{house.bathrooms}</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Maximize className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Area</div>
                  <div className="font-semibold">{house.sqft} sqft</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Deposit</div>
                  <div className="font-semibold">${house.deposit.toLocaleString()}</div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 bg-card border border-white/10 rounded-xl p-4">
                <Calendar className="w-6 h-6 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Available From</div>
                  <div className="font-semibold">{new Date(house.availableFrom).toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{house.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {house.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-white/10 rounded-xl p-6 sticky top-24 shadow-glow">
                <h3 className="text-xl font-heading font-semibold mb-6">Schedule Viewing</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-dark"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-dark"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-dark"
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-dark min-h-[100px]"
                    rows={4}
                  />
                  <Button type="submit" className="w-full btn-gradient">
                    Schedule Viewing
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Similar Houses */}
          {similarHouses.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-semibold mb-8">Similar Rentals</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarHouses.map((h) => (
                  <HouseCard key={h.id} house={h} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalDetail;
