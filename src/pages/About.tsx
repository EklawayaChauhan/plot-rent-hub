import { Target, Users, Shield, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To simplify property discovery by connecting buyers and renters with their perfect plots and homes through a seamless, trustworthy experience.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Every decision we make is guided by what is best for our clients. Your satisfaction is our ultimate measure of success.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in all dealings. Every property is verified, and every transaction is conducted with integrity.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from property curation to customer service and beyond.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Plots Sold' },
    { number: '300+', label: 'Houses Rented' },
    { number: '10K+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-dark-blue-lighter/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
                About <span className="gradient-text">PropLand</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For over 15 years, PropLand has been the trusted name in real estate, 
                specializing in premium plots and quality rental properties. We're not just 
                about transactions – we're about building dreams and creating homes.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PropLand was founded with a simple yet powerful vision: to make property 
                    ownership accessible and hassle-free for everyone. What started as a small 
                    team of passionate real estate professionals has grown into a leading 
                    property platform.
                  </p>
                  <p>
                    We specialize in two core areas: helping you find the perfect plot to build 
                    your dreams, and connecting you with quality rental homes that feel like home 
                    from day one. Our team of experts carefully curates each listing, ensuring 
                    that every property meets our high standards.
                  </p>
                  <p>
                    Today, we're proud to have helped thousands of families find their perfect 
                    properties, and we continue to innovate and improve to serve you better.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-heading font-bold gradient-text mb-2">15+</div>
                    <div className="text-xl text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-dark-blue-lighter/30">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at PropLand
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-white/10 rounded-xl p-6 text-center card-glow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
