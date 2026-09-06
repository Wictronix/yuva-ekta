// ============================================================
// Supabase TypeScript Types — matches the SQL schema exactly
// ============================================================

export type CampaignCategory = 'education' | 'health' | 'livelihood' | 'environment';
export type CampaignStatus = 'active' | 'completed' | 'archived';
export type DonationType = 'one_time' | 'recurring';
export type DonationStatus = 'pending' | 'captured' | 'failed' | 'refunded';
export type SubscriptionStatus = 'created' | 'active' | 'paused' | 'cancelled' | 'completed' | 'expired';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// --- JSONB nested types ---

export type FundingBreakdownItem = {
  label: string;
  amount: number;
  percentage: number;
};

export type ProductItem = {
  name: string;
  impact: string;
  price: number;
  image_url?: string;
};

export type UpdateItem = {
  date: string;
  title: string;
  body: string;
  image_url?: string | null;
};

// --- Table row types ---

export type Campaign = {
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
};

export type Donor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type Donation = {
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
};

export type Subscription = {
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
};

export type AdminSetting = {
  key: string;
  value: string;
};

// --- Join/view types for admin ---

export type DonationWithDonor = Donation & {
  donor: Donor | null;
  campaign: Pick<Campaign, 'id' | 'title' | 'slug'> | null;
};

export type SubscriptionWithDonor = Subscription & {
  donor: Donor | null;
  campaign: Pick<Campaign, 'id' | 'title' | 'slug'> | null;
};

// --- Insert types (matching Postgres schema optionality) ---

export type CampaignInsert = {
  id?: string;
  slug: string;
  title: string;
  short_desc: string;
  long_desc: string;
  cover_image_url?: string | null;
  category?: CampaignCategory | null;
  target_people?: number | null;
  campaign_goal?: number | null;
  amount_raised?: number;
  funding_breakdown?: FundingBreakdownItem[];
  products?: ProductItem[];
  updates?: UpdateItem[];
  status?: CampaignStatus;
  is_featured?: boolean;
  ends_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type CampaignUpdate = Partial<CampaignInsert>;

export type DonorInsert = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
};

export type DonorUpdate = Partial<DonorInsert>;

export type DonationInsert = {
  id?: string;
  donor_id?: string | null;
  campaign_id?: string | null;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  razorpay_signature?: string | null;
  amount: number;
  fee_covered?: boolean;
  fee_amount?: number;
  total_charged?: number;
  type?: DonationType;
  status?: DonationStatus;
  receipt_url?: string | null;
  receipt_number?: string | null;
  created_at?: string;
};

export type DonationUpdate = Partial<DonationInsert>;

export type SubscriptionInsert = {
  id?: string;
  donor_id?: string | null;
  campaign_id?: string | null;
  razorpay_subscription_id: string;
  razorpay_plan_id?: string | null;
  plan_amount: number;
  status?: SubscriptionStatus;
  started_at?: string | null;
  paused_at?: string | null;
  cancelled_at?: string | null;
  admin_note?: string | null;
  created_at?: string;
};

export type SubscriptionUpdate = Partial<SubscriptionInsert>;

export type SubmissionType = 'contact' | 'volunteer' | 'csr';
export type SubmissionStatus = 'unread' | 'reviewed' | 'contacted' | 'archived';

export type FormSubmission = {
  id: string;
  created_at: string;
  type: SubmissionType;
  status: SubmissionStatus;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  thematic_focus: string | null;
  budget_range: string | null;
  subject: string | null;
  message: string | null;
  skills: string | null;
  availability: string | null;
  admin_notes: string | null;
  metadata: Json | null;
};

export type FormSubmissionInsert = {
  id?: string;
  created_at?: string;
  type: SubmissionType;
  status?: SubmissionStatus;
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  thematic_focus?: string | null;
  budget_range?: string | null;
  subject?: string | null;
  message?: string | null;
  skills?: string | null;
  availability?: string | null;
  admin_notes?: string | null;
  metadata?: Json | null;
};

export type FormSubmissionUpdate = Partial<FormSubmissionInsert>;

// --- Supabase Database type for typing the client ---

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: Campaign;
        Insert: CampaignInsert;
        Update: CampaignUpdate;
        Relationships: [];
      };
      donors: {
        Row: Donor;
        Insert: DonorInsert;
        Update: DonorUpdate;
        Relationships: [];
      };
      donations: {
        Row: Donation;
        Insert: DonationInsert;
        Update: DonationUpdate;
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey";
            columns: ["donor_id"];
            isOneToOne: false;
            referencedRelation: "donors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "donations_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
        Relationships: [
          {
            foreignKeyName: "subscriptions_donor_id_fkey";
            columns: ["donor_id"];
            isOneToOne: false;
            referencedRelation: "donors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          }
        ];
      };
      admin_settings: {
        Row: AdminSetting;
        Insert: AdminSetting;
        Update: Partial<AdminSetting>;
        Relationships: [];
      };
      form_submissions: {
        Row: FormSubmission;
        Insert: FormSubmissionInsert;
        Update: FormSubmissionUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_receipt_number: {
        Args: Record<string, never>;
        Returns: string;
      };
      increment_campaign_amount: {
        Args: {
          p_campaign_id: string;
          p_amount: number;
        };
        Returns: void;
      };
    };
  };
}
