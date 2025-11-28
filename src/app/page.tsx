"use client"
import React from 'react';
import { Search, TrendingUp, Shield, Zap, ArrowRight, Package, MapPin, CheckCircle, Users, Building2, Handshake, Mail, Phone, Linkedin, Twitter, Facebook, Star } from 'lucide-react';

// Navbar Component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-primary-glow transition-all duration-300">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-display font-bold text-xl text-neutral-900 hidden sm:block">
                PharmaConnect
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">Companies</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">Products</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">Categories</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              List Your Company
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-900 to-accent-900 py-20 md:py-32">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" style={{ animation: 'float 3s ease-in-out infinite 1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
            <Zap className="w-4 h-4 text-accent-300" />
            <span>Connecting India's Pharma Industry</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Trusted Pharma
            <br />
            <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">Partners in Seconds</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Connect with verified pharmaceutical companies, retailers, and suppliers. 
            Discover quality products and build lasting business relationships.
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search companies, products, or categories..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
                  />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                  Search Now
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { icon: Shield, value: '500+', label: 'Verified Companies', color: 'text-success-300' },
              { icon: TrendingUp, value: '5000+', label: 'Quality Products', color: 'text-accent-300' },
              { icon: Zap, value: '24/7', label: 'Support Available', color: 'text-yellow-300' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Companies Section
function FeaturedCompanies() {
  const companies = [
    { name: 'Apex Pharmaceuticals', city: 'Mumbai', products: 150, years: 25, verified: true },
    { name: 'Medico Plus Retailers', city: 'Delhi', products: 5000, years: 15, verified: true },
    { name: 'BioTech Solutions', city: 'Bangalore', products: 75, years: 10, verified: true },
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Featured Partners</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            Trusted by India's Leading
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Pharma Companies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">{company.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-primary-600 transition-colors">{company.name}</h3>
                    {company.verified && <CheckCircle className="w-5 h-5 text-success-500" fill="currentColor" />}
                  </div>
                  <div className="flex items-center gap-1 text-neutral-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{company.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                <div className="text-sm">
                  <span className="font-semibold text-neutral-900">{company.products}</span>
                  <span className="text-neutral-600"> Products</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-neutral-900">{company.years}</span>
                  <span className="text-neutral-600"> Years</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            <span>View All Companies</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function Stats() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-900 via-primary-900 to-accent-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Building2, value: '500+', label: 'Verified Companies', color: 'primary' },
            { icon: Package, value: '5,000+', label: 'Quality Products', color: 'accent' },
            { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'success' },
            { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate', color: 'warning' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-8 text-center rounded-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className={`w-16 h-16 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-display font-bold text-xl">PharmaConnect</span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              India's premier B2B marketplace for pharma
            </p>
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Contact', 'Pricing'].map((item) => (
                <li key={item}><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Companies', 'Products', 'Blog'].map((item) => (
                <li key={item}><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4" />
                <span>hello@pharmaconnect.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-4 h-4" />
                <span>+91 123 456 7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-400 text-sm">© 2024 PharmaConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Homepage
export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedCompanies />
      <Stats />
      <Footer />
    </div>
  );
}