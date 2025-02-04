// Sample database schema following documentation https://supabase.com/docs/reference/javascript/typescript-support
// TODO: update schema once design is complete

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      TodoList: {
        Row: {
          // the data expected from .select()
          id: number;
          created_at: string;
          name: string;
          isCompleted: boolean;
        };
        Insert: {
          // the data to be passed to .insert()
          id?: never; // generated columns must not be supplied
          created_at: never;
          name: string; // `not null` columns with no default must be supplied
          isCompleted?: boolean;
        };
        Update: {
          // the data to be passed to .update()
          id?: never;
          created_at: never;
          name?: string; // `not null` columns are optional on .update()
          isCompleted?: boolean;
        };
      };
    };
  };
}
