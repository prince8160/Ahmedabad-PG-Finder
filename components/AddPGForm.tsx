import React, { useState } from 'react';
import { PGListing } from '../types';
import { ArrowLeft, Save, Upload, Plus } from 'lucide-react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid or just use Math.random()

type Props = {
  onBack: () => void;
  onSave: (pg: Omit<PGListing, 'id' | 'verified' | 'lastUpdated' | 'totalViews' | 'rating' | 'reviewCount'>) => void;
};

const FACILITIES_LIST = [
  'WiFi', 'AC', 'Laundry', 'Food Included', 'Parking', 
  'CCTV', 'Power Backup', 'Housekeeping', 'Attached Bathroom', 'RO Water'
];

export default function AddPGForm({ onBack, onSave }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    address: '',
    rent: '',
    deposit: '',
    type: 'Boys' as 'Boys' | 'Girls' | 'Co-ed',
    foodAvailable: false,
    availableBeds: '1',
    description: '',
    rules: '',
    curfew: '10:00 PM',
    ownerName: '',
    mobileNumber: '',
    whatsappNumber: '',
    availabilityState: 'Available' as 'Available' | 'Few Beds Left' | 'Full',
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const files = Array.from(e.target.files);
      const urls: string[] = [];
      for (const file of files) {
        const fileRef = ref(storage, `pg_images/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        urls.push(url);
      }
      setImageUrls(prev => [...prev, ...urls]);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      area: formData.area,
      address: formData.address,
      rent: Number(formData.rent) || 0,
      deposit: Number(formData.deposit) || 0,
      type: formData.type,
      foodAvailable: formData.foodAvailable || selectedFacilities.includes('Food Included'),
      imageUrls: imageUrls.length > 0 ? imageUrls : ['https://picsum.photos/seed/placeholder/800/600'],
      availableBeds: Number(formData.availableBeds) || 0,
      facilities: selectedFacilities,
      description: formData.description,
      rules: formData.rules,
      curfew: formData.curfew,
      ownerName: formData.ownerName,
      mobileNumber: formData.mobileNumber,
      whatsappNumber: formData.whatsappNumber,
      availabilityState: formData.availabilityState,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       <div className="bg-white sticky top-0 md:top-16 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button type="button" onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <div className="font-bold text-gray-900 border-l border-gray-200 pl-4">Add New Listing</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ... Basic Info, Details, Facilities (unmodified) */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">PG Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="e.g. Sunrise Boys Hostel" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="House/Building No, Street, Landmark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area / Locality *</label>
                <input required type="text" name="area" value={formData.area} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="e.g. Navrangpura" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">PG Type *</label>
                 <select required name="type" value={formData.type} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white">
                   <option value="Boys">Boys PG</option>
                   <option value="Girls">Girls PG</option>
                   <option value="Co-ed">Co-ed</option>
                 </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹) *</label>
                <input required type="number" name="rent" value={formData.rent} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="8500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit (₹) *</label>
                <input required type="number" name="deposit" value={formData.deposit} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="15000" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Details & Rules</h2>
             <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="Describe the PG, surroundings, and vibe..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rules & Regulations</label>
                  <textarea name="rules" value={formData.rules} onChange={handleChange} rows={2} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="e.g. No smoking, visitors allowed till 8 PM..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Curfew Timing</label>
                    <input type="text" name="curfew" value={formData.curfew} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="10:30 PM (or No Curfew)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Beds</label>
                    <input type="number" name="availableBeds" value={formData.availableBeds} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="Number of empty beds" />
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Facilities Selection</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {FACILITIES_LIST.map(fac => (
                  <label key={fac} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedFacilities.includes(fac) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                    <input type="checkbox" className="sr-only" checked={selectedFacilities.includes(fac)} onChange={() => toggleFacility(fac)} />
                    <span className="text-sm font-medium text-center">{fac}</span>
                  </label>
                ))}
             </div>
          </div>

          {/* Photos */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Photos & Media</h2>
             <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-900 mb-1">Click to upload photos</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                {isUploading && <p className="text-blue-600 text-sm mt-3 font-semibold animate-pulse">Uploading...</p>}
             </label>
             {imageUrls.length > 0 && (
               <div className="flex flex-wrap gap-4 mt-6">
                 {imageUrls.map((url, i) => (
                   <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                     <img src={url} alt="upload preview" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:text-blue-600 transition-colors">
                   <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                   <Plus className="w-6 h-6" />
                 </label>
               </div>
             )}
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact & Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Full Name *</label>
                <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="Ramesh Patel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="+91 99999 99999" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="+91 99999 99999" />
              </div>
              <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Status *</label>
                <div className="flex flex-wrap gap-4">
                  {(['Available', 'Few Beds Left', 'Full'] as const).map((status) => (
                    <label key={status} className={`flex-1 min-w-[150px] text-center px-4 py-3 rounded-xl border-2 cursor-pointer font-medium transition-all
                      ${formData.availabilityState === status 
                        ? 'border-blue-600 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      <input type="radio" name="availabilityState" value={status} checked={formData.availabilityState === status} onChange={handleChange} className="sr-only" />
                      {status}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 pb-12">
            <button type="submit" disabled={isUploading} className="w-full md:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg focus:ring-4 focus:ring-blue-300 disabled:opacity-50">
              <Save className="w-5 h-5 mr-2" />
              Publish Listing
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
