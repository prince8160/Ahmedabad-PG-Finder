export type UserRole = 'user' | 'owner' | 'admin';

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  verifiedOwner: boolean;
  createdAt: any;
  photoURL?: string;
};

export type PGListing = {
  id: string;
  name: string;
  area: string;
  address: string;
  rent: number;
  deposit: number;
  type: 'Boys' | 'Girls' | 'Co-ed';
  foodAvailable: boolean;
  verified: boolean;
  imageUrls: string[];
  videoUrl?: string;
  availableBeds: number;
  facilities: string[];
  description: string;
  rules: string;
  curfew: string;
  ownerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  availabilityState: 'Available' | 'Few Beds Left' | 'Full';
  lastUpdated: string | any;
  totalViews: number;
  rating: number;
  reviewCount: number;
  ownerId?: string;
  createdAt?: any;
  locationGeo?: { lat: number; lng: number };
  reportCount?: number;
};

export type Inquiry = {
  id: string;
  pgId: string;
  userId?: string;
  name: string;
  phone: string;
  message: string;
  createdAt: any;
  status: 'new' | 'contacted' | 'resolved';
};

export type Review = {
  id: string;
  pgId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: any;
};
