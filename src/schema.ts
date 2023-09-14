export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export interface Database {
  public: {
    Tables: {
      on_demand_services: {
        Row: {
          currency: string | null;
          duration_seconds: number | null;
          instance_family: string | null;
          instance_type: string | null;
          offering_id: string | null;
          operation: string | null;
          payment_option: string | null;
          plan_description: string | null;
          plan_type: string | null;
          product_description: string | null;
          product_type: string | null;
          rate: number | null;
          region: string | null;
          service_code: string | null;
          tenancy: string | null;
          unit: string | null;
          usage_type: string | null;
        };
        Insert: {
          currency?: string | null;
          duration_seconds?: number | null;
          instance_family?: string | null;
          instance_type?: string | null;
          offering_id?: string | null;
          operation?: string | null;
          payment_option?: string | null;
          plan_description?: string | null;
          plan_type?: string | null;
          product_description?: string | null;
          product_type?: string | null;
          rate?: number | null;
          region?: string | null;
          service_code?: string | null;
          tenancy?: string | null;
          unit?: string | null;
          usage_type?: string | null;
        };
        Update: {
          currency?: string | null;
          duration_seconds?: number | null;
          instance_family?: string | null;
          instance_type?: string | null;
          offering_id?: string | null;
          operation?: string | null;
          payment_option?: string | null;
          plan_description?: string | null;
          plan_type?: string | null;
          product_description?: string | null;
          product_type?: string | null;
          rate?: number | null;
          region?: string | null;
          service_code?: string | null;
          tenancy?: string | null;
          unit?: string | null;
          usage_type?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
