import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Maximize, Grid3X3, Building, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlotCard from '@/components/PlotCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProperty } from '@/context/PropertyContext';
import { toast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = "9198341 32567"; // 👈 replace with your number (no +, no spaces)

const PlotDetail = () => {
  const { id } = useParams();
  const { plots } = useProperty();
  const plot = plots.find(p => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!plot) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <div className="container-custom section-padding text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Plot Not Found</h1>
            <p className="text-muted-foreground mb-8">The plot you're looking for doesn't exist.</p>
            <Link to="/plots">
              <Button className="btn-gradient">Browse All Plots</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarPlots = plots.filter(p => p.id !== plot.id && p.type === plot.type).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `
Hello, I am interested in this plot.

📌 *Plot Name*: ${plot.title}
📍 *Location*: ${plot.location}
📐 *Size*: ${plot.size} ${plot.sizeUnit}
📏 *Dimensions*: ${plot.dimensions}
🏷️ *Type*: ${plot.type}
💰 *Price*: ₹${plot.price.toLocaleString()}

👤 *Name*: ${formData.name}
📞 *Phone*: ${formData.phone}
📧 *Email*: ${formData.email || "Not provided"}

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
    setCurrentImage((prev) => (prev + 1) % plot.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + plot.images.length) % plot.images.length);
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
            <Link to="/plots" className="hover:text-primary">Plots</Link>
            <span>/</span>
            <span className="text-white">{plot.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-card">
            <img
              src={plot.images[currentImage] || '/placeholder.svg'}
              alt={plot.title}
              className="w-full h-full object-cover"
            />
            {plot.images.length > 1 && (
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
              <span className="px-4 py-2 bg-secondary/90 text-white text-sm font-medium rounded-full">
                {plot.type}
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">{plot.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{plot.location}</span>
                </div>
                <div className="text-4xl font-heading font-bold gradient-text">
                  ₹{plot.price.toLocaleString()}
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Maximize className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Total Area</div>
                  <div className="font-semibold">{plot.size} {plot.sizeUnit}</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Grid3X3 className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Dimensions</div>
                  <div className="font-semibold">{plot.dimensions}</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Building className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-semibold">{plot.type}</div>
                </div>
                <div className="bg-card border border-white/10 rounded-xl p-4 text-center">
                  <Check className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-semibold text-green-400">Available</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{plot.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {plot.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-white/10 rounded-xl p-6 sticky top-24 shadow-glow">
                <h3 className="text-xl font-heading font-semibold mb-6">Schedule Site Visit</h3>
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
                    Schedule Site Visit
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Similar Plots */}
          {similarPlots.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-semibold mb-8">Similar Plots</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarPlots.map((p) => (
                  <PlotCard key={p.id} plot={p} />
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

export default PlotDetail;
