"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ShieldCheck, Star, Users, Map, Settings, Plus, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Mock data representing PG listings
const MOCK_PGS = [
  {
    id: '1',
    name: 'Sky-Hostel Navrangpura',
    area: 'Navrangpura',
    rent: 6500,
    genderType: 'boys',
    foodIncluded: true,
    isVerified: true,
    trustScore: 90,
    availabilityStatus: 'few',
    imageUrl: 'https://picsum.photos/seed/pg1/600/400'
  },
  {
    id: '2',
    name: 'Serene Girls Residency',
    area: 'Vastrapur',
    rent: 8000,
    genderType: 'girls',
    foodIncluded: true,
    isVerified: true,
    trustScore: 95,
    availabilityStatus: 'available',
    imageUrl: 'https://picsum.photos/seed/pg2/600/400'
  },
  {
    id: '3',
    name: 'City Edge Unisex PG',
    area: 'CG Road',
    rent: 5500,
    genderType: 'unisex',
    foodIncluded: false,
    isVerified: false,
    trustScore: 40,
    availabilityStatus: 'full',
    imageUrl: 'https://picsum.photos/seed/pg3/600/400'
  }
];

export default function PGApplication() {
  const [activeTab, setActiveTab] = useState<'explore' | 'admin' | 'my-listings'>('explore');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const loggedInUser = result.user;
      const userRef = doc(db, 'users', loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: loggedInUser.uid,
          name: loggedInUser.displayName || 'User',
          email: loggedInUser.email || '',
          role: 'user', 
          verifiedOwner: false,
          createdAt: serverTimestamp(),
          photoURL: loggedInUser.photoURL || ''
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab('explore');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight cursor-pointer" onClick={() => setActiveTab('explore')}>
            <MapPin className="h-7 w-7" />
            PG Finder
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => setActiveTab('explore')} className={`transition-colors hover:text-primary ${activeTab === 'explore' ? 'text-primary border-b-2 border-primary' : ''}`}>Explore</button>
            {user && <button onClick={() => setActiveTab('my-listings')} className={`transition-colors hover:text-primary ${activeTab === 'my-listings' ? 'text-primary border-b-2 border-primary' : ''}`}>My Listings</button>}
            {user && <button onClick={() => setActiveTab('admin')} className={`transition-colors hover:text-primary ${activeTab === 'admin' ? 'text-primary border-b-2 border-primary' : ''}`}>Owner Dashboard</button>}
            {user ? (
              <Button variant="outline" className="rounded-full" onClick={handleLogout}>Sign Out</Button>
            ) : (
              <Button variant="default" className="rounded-full" onClick={handleLogin}>Sign In</Button>
            )}
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {activeTab === 'explore' && <ExploreTab />}
        {activeTab === 'my-listings' && <MyListingsTab />}
        {activeTab === 'admin' && <AdminTab />}
      </main>
    </div>
  );
}

function ExploreTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by area, PG name or street..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-slate-200">
            <Map className="h-4 w-4 mr-2" /> Map View
          </Button>
          <Button className="flex-1 md:flex-none h-12 rounded-xl">Search</Button>
        </div>
      </div>

      {/* Results Grid */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Recommended for you</h2>
            <p className="text-slate-500 mt-1">Verified PGs with high trust scores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PGS.map(pg => (
            <PGCard key={pg.id} pg={pg} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PGCard({ pg }: { pg: any }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={pg.imageUrl} alt={pg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
          {pg.genderType.toUpperCase()}
        </div>
        {pg.isVerified && (
          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 rounded-full text-xs font-bold text-white shadow-sm">
            <ShieldCheck className="h-3 w-3" /> Verified
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-tight">{pg.name}</h3>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-bold">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {pg.trustScore}
          </div>
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
          <MapPin className="h-3 w-3" /> {pg.area}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Monthly Rent</p>
            <p className="font-bold text-xl text-primary">₹{pg.rent}</p>
          </div>
          <Button variant={pg.availabilityStatus === 'full' ? 'secondary' : 'default'} disabled={pg.availabilityStatus === 'full'}>
            {pg.availabilityStatus === 'full' ? 'Sold Out' : 'Contact Owner'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdminTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Owner Dashboard</h1>
          <p className="text-slate-500">Manage listings, verifications, and trust scores.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-slate-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Reported Listings</h3>
          <p className="text-3xl font-bold text-rose-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Verified Owners</h3>
          <p className="text-3xl font-bold text-emerald-600">145</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold">Recent Listings for Review</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Sunshine PG for Boys</h4>
                  <p className="text-sm text-slate-500">Submitted by <b>Rahul Sharma</b> (Trust Score: 60)</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50">Reject</Button>
                <Button className="flex-1 sm:flex-none">Approve & Verify</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MyListingsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl mx-auto text-center mt-12">
      <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-slate-100 flex flex-col justify-center items-center text-slate-400 mb-6">
          <Users className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">You don't have any listings yet</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Become a verified owner and list your PG to reach thousands of potential tenants. 
          Listings with good trust scores rank higher.
        </p>
        <Button className="h-12 px-8 rounded-xl text-md flex items-center gap-2">
          <Plus className="h-5 w-5" /> Add New PG Listing
        </Button>
      </div>
    </motion.div>
  );
}
