import React from 'react';
import { ArrowRight, MapPin, Package, CheckCircle, TrendingUp } from 'lucide-react';

interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  verified: boolean;
  location: {
    city: string;
    state: string;
  };
  stats: {
    products: number;
    yearsInBusiness: number;
  };
  categories: string[];
}

export default function FeaturedCompanies() {
  const featuredCompanies: Company[] = [
    {
      id: '1',
      slug: 'apex-pharmaceuticals',
      name: 'Apex Pharmaceuticals',
      description: 'Leading manufacturer of generic medicines with 25+ years of excellence in pharmaceutical manufacturing.',
      logo: '/logos/apex-pharma.svg',
      verified: true,
      location: { city: 'Mumbai', state: 'Maharashtra' },
      stats: { products: 150, yearsInBusiness: 25 },
      categories: ['Cardiovascular', 'Diabetes Care'],
    },
    {
      id: '2',
      slug: 'medico-plus-retailers',
      name: 'Medico Plus Retailers',
      description: 'Premium pharmacy chain with 50+ outlets across North India.',
      logo: '/logos/medico-plus.svg',
      verified: true,
      location: { city: 'Delhi', state: 'Delhi' },
      stats: { products: 5000, yearsInBusiness: 15 },
      categories: ['Pharmacy', 'Healthcare'],
    },
    {
      id: '3',
      slug: 'biotech-solutions',
      name: 'BioTech Solutions',
      description: 'Innovative biotechnology company specializing in advanced drug formulations.',
      logo: '/logos/biotech.svg',
      verified: true,
      location: { city: 'Bangalore', state: 'Karnataka' },
      stats: { products: 75, yearsInBusiness: 10 },
      categories: ['Biotechnology', 'Research'],
    },
  ];

  return (
    <section className="section-spacing bg-neutral-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30"></div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Featured Partners</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Trusted by India's Leading
            <br />
            <span className="gradient-text">Pharma Companies</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Connect with verified pharmaceutical manufacturers, distributors, and retailers
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Large Featured Card */}
          <div className="lg:col-span-2 lg:row-span-2">
            <a href={`/companies/${featuredCompanies[0].slug}`} className="block group h-full">
              <div className="card-hover p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary-glow transition-shadow">
                    <span className="text-white font-bold text-3xl">
                      {featuredCompanies[0].name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-2xl text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {featuredCompanies[0].name}
                      </h3>
                      <CheckCircle className="w-6 h-6 text-success-500" fill="currentColor" />
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <MapPin className="w-4 h-4" />
                      <span>{featuredCompanies[0].location.city}, {featuredCompanies[0].location.state}</span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-600 mb-6 text-lg">
                  {featuredCompanies[0].description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredCompanies[0].categories.map((cat) => (
                    <span key={cat} className="badge badge-primary">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-600 mb-1">
                      <Package className="w-5 h-5" />
                      <span className="text-sm font-medium">Products</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">
                      {featuredCompanies[0].stats.products}+
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-2 text-accent-600 mb-1">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">
                      {featuredCompanies[0].stats.yearsInBusiness} Years
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-200 mt-auto">
                  <span className="text-primary-600 font-semibold">View Full Profile</span>
                  <ArrowRight className="w-6 h-6 text-primary-600 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Smaller Cards */}
          {featuredCompanies.slice(1).map((company) => (
            <a
              key={company.id}
              href={`/companies/${company.slug}`}
              className="block group"
            >
              <div className="card-hover p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                        {company.name}
                      </h3>
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" />
                    </div>
                    <div className="flex items-center gap-1 text-neutral-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{company.location.city}</span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {company.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.categories.map((cat) => (
                    <span key={cat} className="badge badge-primary text-xs">
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <span className="text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-900">{company.stats.products}</span> Products
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a
            href="/companies"
            className="inline-flex items-center gap-2 btn-gradient"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}