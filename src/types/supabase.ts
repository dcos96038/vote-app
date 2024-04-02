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
			bills: {
				Row: {
					amount: number;
					created_at: string;
					id: number;
					meet: number;
					payed_by: string;
				};
				Insert: {
					amount: number;
					created_at?: string;
					id?: number;
					meet: number;
					payed_by: string;
				};
				Update: {
					amount?: number;
					created_at?: string;
					id?: number;
					meet?: number;
					payed_by?: string;
				};
				Relationships: [
					{
						foreignKeyName: "public_bills_meet_fkey";
						columns: ["meet"];
						isOneToOne: true;
						referencedRelation: "weekly_meets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "public_bills_payed_by_fkey";
						columns: ["payed_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			food_places: {
				Row: {
					closing_time: string;
					created_at: string;
					id: string;
					location: string;
					menu: string | null;
					name: string;
					opening_time: string;
					verified: boolean;
				};
				Insert: {
					closing_time: string;
					created_at?: string;
					id?: string;
					location: string;
					menu?: string | null;
					name: string;
					opening_time: string;
					verified?: boolean;
				};
				Update: {
					closing_time?: string;
					created_at?: string;
					id?: string;
					location?: string;
					menu?: string | null;
					name?: string;
					opening_time?: string;
					verified?: boolean;
				};
				Relationships: [];
			};
			users: {
				Row: {
					base_user: string;
					created_at: string;
					email: string | null;
					id: string;
					role: Database["public"]["Enums"]["Roles"] | null;
				};
				Insert: {
					base_user: string;
					created_at?: string;
					email?: string | null;
					id: string;
					role?: Database["public"]["Enums"]["Roles"] | null;
				};
				Update: {
					base_user?: string;
					created_at?: string;
					email?: string | null;
					id?: string;
					role?: Database["public"]["Enums"]["Roles"] | null;
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
			users_attendances: {
				Row: {
					created_at: string;
					id: number;
					meet: number;
					user: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					meet: number;
					user: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					meet?: number;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: "public_users_attendances_meet_fkey";
						columns: ["meet"];
						isOneToOne: false;
						referencedRelation: "weekly_meets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "public_users_attendances_user_fkey";
						columns: ["user"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			users_bills: {
				Row: {
					amount: number;
					bill: number;
					created_at: string;
					id: number;
					payed: boolean;
					user: string;
				};
				Insert: {
					amount: number;
					bill: number;
					created_at?: string;
					id?: number;
					payed?: boolean;
					user: string;
				};
				Update: {
					amount?: number;
					bill?: number;
					created_at?: string;
					id?: number;
					payed?: boolean;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: "public_users_bills_bill_fkey";
						columns: ["bill"];
						isOneToOne: false;
						referencedRelation: "bills";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "public_users_bills_user_fkey";
						columns: ["user"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			valorations: {
				Row: {
					created_at: string;
					food_place: string;
					id: number;
					meet: number;
					score: number | null;
					user: string;
				};
				Insert: {
					created_at?: string;
					food_place: string;
					id?: number;
					meet: number;
					score?: number | null;
					user: string;
				};
				Update: {
					created_at?: string;
					food_place?: string;
					id?: number;
					meet?: number;
					score?: number | null;
					user?: string;
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
						foreignKeyName: "public_valorations_meet_fkey";
						columns: ["meet"];
						isOneToOne: false;
						referencedRelation: "weekly_meets";
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
			weekly_meets: {
				Row: {
					created_at: string;
					date: string;
					id: number;
					place: string;
					will_occur: boolean;
				};
				Insert: {
					created_at?: string;
					date: string;
					id?: number;
					place: string;
					will_occur?: boolean;
				};
				Update: {
					created_at?: string;
					date?: string;
					id?: number;
					place?: string;
					will_occur?: boolean;
				};
				Relationships: [
					{
						foreignKeyName: "public_weekly_meet_place_fkey";
						columns: ["place"];
						isOneToOne: false;
						referencedRelation: "food_places";
						referencedColumns: ["id"];
					},
				];
			};
			weekly_votes: {
				Row: {
					created_at: string;
					id: number;
					meet: number;
					place: string;
					user: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					meet: number;
					place: string;
					user?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					meet?: number;
					place?: string;
					user?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "public_weekly_votes_meet_fkey";
						columns: ["meet"];
						isOneToOne: false;
						referencedRelation: "weekly_meets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "public_weekly_votes_place_fkey";
						columns: ["place"];
						isOneToOne: false;
						referencedRelation: "food_places";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "public_weekly_votes_user_fkey";
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
			Roles: "ADMIN" | "USER";
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
