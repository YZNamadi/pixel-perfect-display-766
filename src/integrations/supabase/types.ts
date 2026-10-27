export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          data: Json
          owner_id: string
          updated_at: string
        }
        Insert: {
          data?: Json
          owner_id: string
          updated_at?: string
        }
        Update: {
          data?: Json
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          actor: string
          details: string
          entity: string
          id: string
          ip: string
          notes: string
          occurred_at: string
          owner_id: string
          priority: string
          review_status: string
          session_id: string
        }
        Insert: {
          action: string
          actor?: string
          details?: string
          entity?: string
          id?: string
          ip?: string
          notes?: string
          occurred_at?: string
          owner_id: string
          priority?: string
          review_status?: string
          session_id?: string
        }
        Update: {
          action?: string
          actor?: string
          details?: string
          entity?: string
          id?: string
          ip?: string
          notes?: string
          occurred_at?: string
          owner_id?: string
          priority?: string
          review_status?: string
          session_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          expires_on: string | null
          file_path: string
          id: string
          member_id: string | null
          name: string
          owner_id: string
          uploaded_at: string
        }
        Insert: {
          expires_on?: string | null
          file_path?: string
          id?: string
          member_id?: string | null
          name: string
          owner_id: string
          uploaded_at?: string
        }
        Update: {
          expires_on?: string | null
          file_path?: string
          id?: string
          member_id?: string | null
          name?: string
          owner_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string
          file_path: string
          file_size: number
          id: string
          name: string
          owner_id: string
          site_id: string | null
          status: string
          uploaded_at: string
        }
        Insert: {
          category?: string
          file_path?: string
          file_size?: number
          id?: string
          name: string
          owner_id: string
          site_id?: string | null
          status?: string
          uploaded_at?: string
        }
        Update: {
          category?: string
          file_path?: string
          file_size?: number
          id?: string
          name?: string
          owner_id?: string
          site_id?: string | null
          status?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          category: string
          created_at: string
          id: string
          incidents: number
          maintenance_schedule: string
          name: string
          next_due: string | null
          owner_id: string
          serial: string
          site_id: string | null
          status: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          incidents?: number
          maintenance_schedule?: string
          name: string
          next_due?: string | null
          owner_id: string
          serial?: string
          site_id?: string | null
          status?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          incidents?: number
          maintenance_schedule?: string
          name?: string
          next_due?: string | null
          owner_id?: string
          serial?: string
          site_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          kind: string
          owner_id: string
          read: boolean
          title: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          owner_id: string
          read?: boolean
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          owner_id?: string
          read?: boolean
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string
          company: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          role_label: string
        }
        Insert: {
          account_type?: string
          company?: string
          created_at?: string
          email: string
          full_name?: string
          id: string
          phone?: string
          role_label?: string
        }
        Update: {
          account_type?: string
          company?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          role_label?: string
        }
        Relationships: []
      }
      repair_tickets: {
        Row: {
          assignee: string
          completed_at: string | null
          created_at: string
          description: string
          id: string
          owner_id: string
          priority: string
          site_id: string | null
          status: string
          title: string
        }
        Insert: {
          assignee?: string
          completed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          owner_id: string
          priority?: string
          site_id?: string | null
          status?: string
          title: string
        }
        Update: {
          assignee?: string
          completed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          owner_id?: string
          priority?: string
          site_id?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "repair_tickets_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          category: string
          created_at: string
          id: string
          owner_id: string
          payload: Json
          site_id: string | null
          staff_member: string
          status: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          owner_id: string
          payload?: Json
          site_id?: string | null
          staff_member?: string
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          owner_id?: string
          payload?: Json
          site_id?: string | null
          staff_member?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          address: string
          city: string
          compliance_score: number
          created_at: string
          id: string
          name: string
          open_repairs: number
          owner_id: string
          ppm_outstanding: number
        }
        Insert: {
          address?: string
          city?: string
          compliance_score?: number
          created_at?: string
          id?: string
          name: string
          open_repairs?: number
          owner_id: string
          ppm_outstanding?: number
        }
        Update: {
          address?: string
          city?: string
          compliance_score?: number
          created_at?: string
          id?: string
          name?: string
          open_repairs?: number
          owner_id?: string
          ppm_outstanding?: number
        }
        Relationships: []
      }
      staff_records: {
        Row: {
          created_at: string
          department: string
          id: string
          job_title: string
          name: string
          owner_id: string
          start_date: string | null
          status: string
        }
        Insert: {
          created_at?: string
          department?: string
          id?: string
          job_title?: string
          name: string
          owner_id: string
          start_date?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          department?: string
          id?: string
          job_title?: string
          name?: string
          owner_id?: string
          start_date?: string | null
          status?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee: string
          category: string
          completed_at: string | null
          created_at: string
          due_date: string | null
          id: string
          owner_id: string
          site_id: string | null
          status: string
          title: string
        }
        Insert: {
          assignee?: string
          category?: string
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          owner_id: string
          site_id?: string | null
          status?: string
          title: string
        }
        Update: {
          assignee?: string
          category?: string
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          owner_id?: string
          site_id?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          avatar_tone: string
          company: string
          created_at: string
          email: string
          id: string
          member_type: string
          name: string
          owner_id: string
          role: string
          status: string
        }
        Insert: {
          avatar_tone?: string
          company?: string
          created_at?: string
          email?: string
          id?: string
          member_type?: string
          name: string
          owner_id: string
          role?: string
          status?: string
        }
        Update: {
          avatar_tone?: string
          company?: string
          created_at?: string
          email?: string
          id?: string
          member_type?: string
          name?: string
          owner_id?: string
          role?: string
          status?: string
        }
        Relationships: []
      }
      ticket_quotes: {
        Row: {
          amount: number
          contractor_id: string | null
          created_at: string
          id: string
          note: string
          owner_id: string
          status: string
          ticket_id: string | null
        }
        Insert: {
          amount?: number
          contractor_id?: string | null
          created_at?: string
          id?: string
          note?: string
          owner_id: string
          status?: string
          ticket_id?: string | null
        }
        Update: {
          amount?: number
          contractor_id?: string | null
          created_at?: string
          id?: string
          note?: string
          owner_id?: string
          status?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_quotes_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_quotes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "repair_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      training_records: {
        Row: {
          completed_on: string | null
          course: string
          created_at: string
          expires_on: string | null
          id: string
          owner_id: string
          staff_id: string | null
          status: string
        }
        Insert: {
          completed_on?: string | null
          course: string
          created_at?: string
          expires_on?: string | null
          id?: string
          owner_id: string
          staff_id?: string | null
          status?: string
        }
        Update: {
          completed_on?: string | null
          course?: string
          created_at?: string
          expires_on?: string | null
          id?: string
          owner_id?: string
          staff_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_records_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_records"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
