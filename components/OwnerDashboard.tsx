import React from 'react';
import { PGListing } from '../types';
import { Plus, Settings, Eye, MessageSquare, IndianRupee, BedDouble, Edit3, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
  listings: PGListing[];
  onAddPG: () => void;
  onEditPG: (id: string) => void;
  onDeletePG: (id: string) => void;
};

export default function OwnerDashboard({ listings, onAddPG, onEditPG, onDeletePG }: Props) {
  const activeListings = listings.filter(l => l.availabilityState !== 'Full').length;
  const totalViews = listings.reduce((acc, curr) => acc + curr.totalViews, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your properties and inquiries.</p>
          </div>
          <button 
            onClick={onAddPG}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New PG
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600 mr-4">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Listings</p>
              <h3 className="text-2xl font-bold text-gray-900">{listings.length}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-green-50 p-4 rounded-xl text-green-600 mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active (Available)</p>
              <h3 className="text-2xl font-bold text-gray-900">{activeListings}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-purple-50 p-4 rounded-xl text-purple-600 mr-4">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Views</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString('en-IN')}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="bg-orange-50 p-4 rounded-xl text-orange-600 mr-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Recent Inquiries</p>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
            </div>
          </div>
        </div>

        {/* Listings Management */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {listings.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                You have not listed any properties yet.
              </div>
            ) : (
              listings.map((pg) => (
                <div key={pg.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center hover:bg-gray-50 transition-colors">
                  <div className="relative h-24 w-32 rounded-xl overflow-hidden shrink-0">
                    <Image src={pg.imageUrls[0] || 'https://picsum.photos/seed/placeholder/800/600'} alt={pg.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{pg.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{pg.area} • {pg.type} PG</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                       <span className={`px-2.5 py-1 rounded-md text-xs font-medium border
                        ${pg.availabilityState === 'Available' ? 'bg-green-50 text-green-700 border-green-100' : 
                          pg.availabilityState === 'Few Beds Left' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          'bg-red-50 text-red-700 border-red-100'}
                      `}>
                        {pg.availabilityState}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{pg.totalViews} Views</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                    <div className="font-bold text-gray-900 mb-2 sm:mb-0 text-center sm:text-right">
                      ₹{pg.rent.toLocaleString('en-IN')}<span className="text-xs text-gray-500 font-normal">/mo</span>
                    </div>
                    <div className="flex justify-center sm:justify-end gap-2 w-full">
                       <button onClick={() => onEditPG(pg.id)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200">
                         <Edit3 className="w-4 h-4" />
                       </button>
                       <button onClick={() => {
                          if (confirm('Are you sure you want to delete this listing?')) {
                            onDeletePG(pg.id);
                          }
                       }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="M22 4L12 14.01l-3-3"></path>
  </svg>
)
