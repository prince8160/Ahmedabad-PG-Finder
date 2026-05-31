import React, { useState } from 'react';
import { PGListing } from '../types';
import Image from 'next/image';
import { 
  ArrowLeft, MapPin, IndianRupee, CheckCircle, 
  Wifi, Snowflake, Shirt, Coffee, Car, 
  Video, Zap, Trash2, Home, Share2, Heart,
  Phone, MessageCircle, AlertTriangle, Star
} from 'lucide-react';

type Props = {
  pg: PGListing;
  onBack: () => void;
};

const facilityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-5 h-5" />,
  'AC': <Snowflake className="w-5 h-5" />,
  'Laundry': <Shirt className="w-5 h-5" />,
  'Food Included': <Coffee className="w-5 h-5" />,
  'Parking': <Car className="w-5 h-5" />,
  'CCTV': <Video className="w-5 h-5" />,
  'Power Backup': <Zap className="w-5 h-5" />,
  'Housekeeping': <Trash2 className="w-5 h-5" />,
  'Attached Bathroom': <Home className="w-5 h-5" />,
  'RO Water': <Coffee className="w-5 h-5" />,
};

export default function PGDetailsPage({ pg, onBack }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Mobile top bar / Desktop breadcrumb */}
      <div className="bg-white sticky top-16 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Search</span>
          </button>
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-pink-600"><Heart className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-blue-600"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-[300px] sm:h-[400px] w-full">
                <Image 
                  src={pg.imageUrls[activeImage] || 'https://picsum.photos/seed/placeholder/800/600'} 
                  alt={pg.name} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                {pg.verified && (
                  <div className="absolute top-4 left-4 bg-white/95 text-blue-700 px-3 py-1.5 rounded-full text-sm font-bold flex items-center shadow-sm backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    VERIFIED OWNER
                  </div>
                )}
                {pg.availabilityState === 'Full' && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    FULLY BOOKED
                  </div>
                )}
              </div>
              {pg.imageUrls.length > 1 && (
                <div className="flex p-2 gap-2 overflow-x-auto">
                  {pg.imageUrls.map((url, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-blue-600' : 'border-transparent'}`}
                    >
                      <Image src={url} alt={`Thumbnail ${idx}`} fill className="object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pg.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span className="text-lg">{pg.area}, Ahmedabad</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    <span className="font-medium text-gray-700 mr-1">{pg.rating}</span>
                    <span>({pg.reviewCount} reviews)</span>
                    <span className="mx-2">•</span>
                    <span>{pg.totalViews} views</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="bg-gray-50 inline-block px-4 py-2 rounded-xl mb-2 border border-gray-100">
                    <span className="text-sm text-gray-500 block mb-1">Monthly Rent</span>
                    <span className="text-2xl font-bold text-gray-900 flex items-center">
                      <IndianRupee className="w-6 h-6 mr-1" />
                      {pg.rent.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 my-6">
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">PG Type</span>
                  <span className="font-semibold text-gray-900">{pg.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Deposit</span>
                  <span className="font-semibold text-gray-900">₹{pg.deposit.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Food</span>
                  <span className="font-semibold text-gray-900">{pg.foodAvailable ? 'Available' : 'Not Included'}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Availability</span>
                  <span className={`font-semibold ${pg.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pg.availableBeds > 0 ? `${pg.availableBeds} Beds Left` : 'Full'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">About this PG</h3>
                <p className="text-gray-600 leading-relaxed">{pg.description}</p>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Facilities & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                {pg.facilities.map((fac) => (
                  <div key={fac} className="flex items-center text-gray-700">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-3">
                      {facilityIcons[fac] || <CheckCircle className="w-5 h-5" />}
                    </div>
                    <span className="font-medium">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rules & Curfew</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 shrink-0 mt-0.5" />
                    <span>{pg.rules}</span>
                  </li>
                  <li className="flex items-center mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                     <span className="font-medium mr-2">Curfew Timing:</span> {pg.curfew}
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location Map</h3>
                <div className="w-full h-32 bg-gray-200 rounded-xl relative overflow-hidden mb-3 border border-gray-300">
                   {/* Placeholder for iframe map */}
                   <Image src="https://picsum.photos/seed/map/600/300" alt="Map" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-bold text-gray-800 flex items-center">
                       <MapPin className="w-4 h-4 mr-1 text-red-500" />
                       View on Maps
                     </div>
                   </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{pg.address}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Sticky Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-36">
              <div className="bg-gray-900 p-6 text-white">
                <h3 className="text-lg font-medium text-gray-300 mb-1">Contact Owner</h3>
                <div className="text-2xl font-bold">{pg.ownerName}</div>
                <div className="text-sm text-gray-400 mt-2">Last active: {pg.lastUpdated}</div>
              </div>
              
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-sm shadow-green-200">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </button>
                
                <button className="w-full flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold py-4 px-6 rounded-xl transition-colors border border-blue-200">
                  <Phone className="w-5 h-5 mr-2" />
                  Show Number
                </button>

                <button className="w-full flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-xl transition-colors border border-gray-200 mt-2">
                  Send Inquiry Form
                </button>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                <button className="text-sm text-gray-500 hover:text-red-600 underline">Report this listing</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
