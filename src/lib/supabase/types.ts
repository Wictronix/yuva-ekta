// ============================================================
// Supabase TypeScript Types — matches the SQL schema exactly
// ============================================================

export type CampaignCategory = 'education' | 'health' | 'livelihood' | 'environment';
export type CampaignStatus = 'active' | 'completed' | 'archived';
export type DonationType = 'one_time' | 'recurring';
export type DonationStatus = 'pending' | 'captured' | 'failed' | 'refunded';
export type SubscriptionStatus = 'created' | 'active' | 'paused' | 'cancelled' | 'completed' | 'expired';

// --- JSONB nested types ---

export interface FundingBreakdownItem {
  label: string;
  amount: number;
  percentage: number;
}

export interface ProductItem {
  name: string;
  impact: string;
  price: number;
  image_url?: string;
}

export interface UpdateItem {
  date: string;
  title: string;
  body: string;
  image_url?: string | null;
}

// --- Table row types ---

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  short_desc: string;
  long_desc: string;
  cover_image_url: string | null;
  category: CampaignCategory | null;
  target_people: number | null;
  campaign_goal: number | null;
  amount_raised: number;
  funding_breakdown: FundingBreakdownItem[];
  products: ProductItem[];
  updates: UpdateItem[];
  status: CampaignStatus;
  is_featured: boolean;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_id: string | null;
  campaign_id: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  amount: number;
  fee_covered: boolean;
  fee_amount: number;
  total_charged: number;
  type: DonationType;
  status: DonationStatus;
  receipt_url: string | null;
  receipt_number: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  donor_id: string | null;
  campaign_id: string | null;
  razorpay_subscription_id: string;
  razorpay_plan_id: string | null;
  plan_amount: number;
  status: SubscriptionStatus;
  started_at: string | null;
  paused_at: string | null;
  cancelled_at: string | null;
  admin_note: string | null;
  created_at: string;
}

export interface AdminSetting {
  key: string;
  value: string;
}

// --- Join/view types for admin ---

export interface DonationWithDonor extends Donation {
  donor: Donor | null;
  campaign: Pick<Campaign, 'id' | 'title' | 'slug'> | null;
}

export interface SubscriptionWithDonor extends Subscription {
  donor: Donor | null;
  campaign: Pick<Campaign, 'id' | 'title' | 'slug'> | null;
}

// --- Insert types (omit auto-generated fields) ---

export type CampaignInsert = Omit<Campaign, 'id' | 'created_at' | 'updated_at' | 'amount_raised'>;
export type CampaignUpdate = Partial<CampaignInsert>;

export type DonorInsert = Omit<Donor, 'id' | 'created_at'>;
export type DonationInsert = Omit<Donation, 'id' | 'created_at'>;
export type SubscriptionInsert = Omit<Subscription, 'id' | 'created_at'>;

// --- Supabase Database type for typing the client ---

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: Campaign;
        Insert: CampaignInsert;
        Update: CampaignUpdate;
      };
      donors: {
        Row: Donor;
        Insert: DonorInsert;
        Update: Partial<DonorInsert>;
      };
      donations: {
        Row: Donation;
        Insert: DonationInsert;
        Update: Partial<DonationInsert>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: Partial<SubscriptionInsert>;
      };
      admin_settings: {
        Row: AdminSetting;
        Insert: AdminSetting;
        Update: Partial<AdminSetting>;
      };
    };
  };
}
