export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      food_places: {
        Row: {
          closing_time: string | null;
          created_at: string;
          id: string;
          location: string | null;
          menu: string | null;
          name: string | null;
          opening_time: string | null;
          score: number | null;
          valorations: number[] | null;
        };
        Insert: {
          closing_time?: string | null;
          created_at?: string;
          id?: string;
          location?: string | null;
          menu?: string | null;
          name?: string | null;
          opening_time?: string | null;
          score?: number | null;
          valorations?: number[] | null;
        };
        Update: {
          closing_time?: string | null;
          created_at?: string;
          id?: string;
          location?: string | null;
          menu?: string | null;
          name?: string | null;
          opening_time?: string | null;
          score?: number | null;
          valorations?: number[] | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          base_user: string;
          created_at: string;
          email: string | null;
          id: string;
        };
        Insert: {
          base_user: string;
          created_at?: string;
          email?: string | null;
          id: string;
        };
        Update: {
          base_user?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_base_user_fkey";
            columns: ["base_user"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      valorations: {
        Row: {
          created_at: string;
          food_place: string | null;
          id: number;
          user: string | null;
        };
        Insert: {
          created_at?: string;
          food_place?: string | null;
          id?: number;
          user?: string | null;
        };
        Update: {
          created_at?: string;
          food_place?: string | null;
          id?: number;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_valorations_food_place_fkey";
            columns: ["food_place"];
            isOneToOne: false;
            referencedRelation: "food_places";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_valorations_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
