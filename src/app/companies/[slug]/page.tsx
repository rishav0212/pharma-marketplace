import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle, 
  Award,
  Linkedin,
  Building2,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

// Import your data and components
import { companies, products } from '@/types/company';
import ProductCard from '@/components/product/ProductCard';

// 1. Generate Static Params for Static Site Generation (SSG)
export async function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyProfilePage({ params }: PageProps) {
  // Await params in Next.js 15+
  const { slug } = await params;
  
  // 2. Find the Company Data
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  // 3. Filter Products for this Company
  const companyProducts = products.filter((p) => p.companyId === company.id);

  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      {/* --- Hero Section --- */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full bg-neutral-900 overflow-hidden">
        {/* Cover Image Background (Simulated with gradient if no image) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ 
            backgroundImage: `url(${company.coverImage || '/images/defaults/company-cover.jpg'})`,
            backgroundColor: '#0f172a' // Fallback color
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
      </div>

      {/* --- Content Container --- */}
      <div className="container-custom relative -mt-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Sidebar (Company Info) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24 border border-neutral-100">
              {/* Logo & Identity */}
              <div className="relative mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2 mb-4 -mt-20 md:-mt-24 border-4 border-white">
                  {/* Ideally use next/image here */}
                  <div className="w-full h-full bg-neutral-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                     {/* Placeholder for Logo Image */}
                     <span className="text-4xl font-bold text-primary-600">{company.name.charAt(0)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display font-bold text-2xl text-neutral-900">
                      {company.name}
                    </h1>
                    {company.verified && (
                      <CheckCircle className="w-5 h-5 text-success-500 fill-success-50" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-neutral-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location.city}, {company.location.state}, {company.location.country}</span>
                  </div>
                  
                  {/* Quick Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`badge ${company.type === 'marketing' ? 'badge-primary' : 'badge-success'}`}>
                      {company.type === 'marketing' ? 'Marketing Company' : 'Retailer'}
                    </span>
                    {company.featured && (
                      <span className="badge bg-warning-100 text-warning-700 border-warning-200">
                        Featured Partner
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-neutral-100 my-6" />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Contact Details</h3>
                
                <a href={`mailto:${company.contact.email}`} className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                  <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium truncate">{company.contact.email}</span>
                </a>

                <a href={`tel:${company.contact.phone}`} className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                  <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{company.contact.phone}</span>
                </a>

                {company.contact.website && (
                  <a href={company.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                    <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium truncate">Visit Website</span>
                  </a>
                )}

                {company.socialLinks?.linkedin && (
                  <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                    <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">LinkedIn Profile</span>
                  </a>
                )}
              </div>

              <div className="mt-8">
                <button className="w-full btn-primary flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </div>
          </div>

          {/* --- Main Content (Right Side) --- */}
          <div className="lg:col-span-2 space-y-8 mt-4 lg:mt-0">
            
            {/* About Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">About Us</h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                {company.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <Building2 className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <div className="font-bold text-xl text-neutral-900">{company.stats.yearsInBusiness}+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Years</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <ShieldCheck className="w-6 h-6 text-success-500 mx-auto mb-2" />
                  <div className="font-bold text-xl text-neutral-900">{company.stats.products}+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Products</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <Users className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                  <div className="font-bold text-xl text-neutral-900">{company.stats.employees || 'N/A'}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Employees</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <Calendar className="w-6 h-6 text-warning-500 mx-auto mb-2" />
                  <div className="font-bold text-xl text-neutral-900">{new Date(company.createdAt).getFullYear()}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Joined</div>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            {company.certifications && company.certifications.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                <h2 className="font-display text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-500" />
                  <span>Certifications & Licenses</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {company.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-success-500" />
                      <span className="font-medium text-neutral-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Products Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Products 
                  <span className="ml-2 text-base font-normal text-neutral-500">({companyProducts.length})</span>
                </h2>
                <Link href="/products" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1 text-sm">
                  View all products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {companyProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 border-dashed">
                  <p className="text-neutral-500">No products listed by this company yet.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}