import React from 'react';
import { MapPin, Search, CheckCircle, Utensils, ShieldCheck, IndianRupee, Phone } from 'lucide-react';
import Image from 'next/image';
import { PGListing } from '../types';

const POPULAR_AREAS = [
  'Navrangpura',
  'Vastrapur',
  'Chandkheda',
  'Gota',
  'Nikol',
  'Satellite',
  'SG Highway'
];

type Props = {
  listings: PGListing[];
  onViewDetails: (id: string) => void;
};

export default function HomePage({ listings, onViewDetails }: Props) {
  return (
    <main className="flex-grow bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Find Your Perfect PG in <span className="text-blue-600">Ahmedabad</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10">
              Verified accommodations for students & professionals. Safe, affordable, and comfortable living spaces just a click away.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm" 
                  placeholder="Enter Area (e.g. Navrangpura)" 
                />
              </div>
              <div className="sm:w-48">
                <select className="block w-full pl-3 pr-10 py-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700 shadow-sm appearance-none">
                  <option value="">Budget</option>
                  <option value="5k">Under ₹5,000</option>
                  <option value="10k">Under ₹10,000</option>
                  <option value="15k">Under ₹15,000</option>
                  <option value="15k+">₹15,000+</option>
                </select>
              </div>
              <div className="sm:w-48">
                <select className="block w-full pl-3 pr-10 py-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700 shadow-sm appearance-none">
                  <option value="">PG Type</option>
                  <option value="Boys">Boys PG</option>
                  <option value="Girls">Girls PG</option>
                  <option value="Co-ed">Co-ed</option>
                </select>
              </div>
              <div className="sm:w-auto">
                <button type="submit" className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-md">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Areas Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Areas in Ahmedabad</h2>
          <div className="flex flex-wrap gap-3">
            {POPULAR_AREAS.map((area) => (
              <a 
                key={area}
                href={`#${area.toLowerCase()}`}
                className="px-5 py-2.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors font-medium text-sm"
              >
                {area}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured PGs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Verified & Featured</h2>
              <p className="text-gray-600">Top rated accommodations with premium facilities.</p>
            </div>
            <a href="#all" className="hidden sm:block text-blue-600 font-medium hover:text-blue-800 transition-colors">See all →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((pg) => (
              <div key={pg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer" onClick={() => onViewDetails(pg.id)}>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={pg.imageUrls[0]} 
                    alt={pg.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {pg.verified && (
                      <span className="bg-white/95 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm backdrop-blur-sm">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4">
                     <span className="bg-gray-900/80 backdrop-blur text-white px-3 py-1.5 rounded-lg text-lg font-bold shadow-sm">
                        ₹{pg.rent.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-300"> /mo</span>
                      </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2 mt-1">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{pg.name}</h3>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400 shrink-0" />
                    <span className="truncate">{pg.area}, Ahmedabad</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center border
                      ${pg.type === 'Girls' ? 'bg-pink-50 text-pink-700 border-pink-100' : 
                        pg.type === 'Boys' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        'bg-purple-50 text-purple-700 border-purple-100'}
                    `}>
                      {pg.type} PG
                    </span>
                    <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-md text-xs font-medium flex items-center">
                      <Utensils className="w-3 h-3 mr-1" />
                      {pg.foodAvailable ? 'Food Included' : 'No Food'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-50">
                    <button className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm" onClick={(e) => { e.stopPropagation(); onViewDetails(pg.id); }}>
                      View Details
                    </button>
                    <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm shadow-green-200" onClick={(e) => { e.stopPropagation(); alert('Opening WhatsApp to contact ' + pg.ownerName); }}>
                       WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <a href="#all" className="inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors border border-blue-600 px-6 py-2 rounded-full">See all PGs</a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-10">Why choose Ahmedabad PG Finder?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Verified Listings</h3>
              <p className="text-blue-100 max-w-xs text-sm">Every PG is physically verified by our team to guarantee authentic photos and amenities.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <IndianRupee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Brokerage</h3>
              <p className="text-blue-100 max-w-xs text-sm">Connect directly with owners. Absolutely no hidden fees or agency commissions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Chat</h3>
              <p className="text-blue-100 max-w-xs text-sm">Reach out to owners instantly via WhatsApp to schedule visits or lock in deals.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
