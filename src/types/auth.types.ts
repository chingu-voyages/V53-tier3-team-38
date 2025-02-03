import {
    AuthResponse,
    Session,
    OAuthResponse,
    User,
} from "@supabase/supabase-js";

type ResponseStatus = {
    success: boolean | null | undefined;
}

export type AuthResponseCustom = 
                ResponseStatus & AuthResponse 
                | ResponseStatus & OAuthResponse;

export type SupabaseContext = {
    user: User | null;
    session: Session | null;
    signUpNewUser: (email: string, password: string) => Promise<AuthResponseCustom> | null;
    signInUser: (email: string, password: string) => Promise<AuthResponseCustom> | null;
    signInUserGoogle: () => Promise<AuthResponseCustom> | null;
    signOut: () => Promise<AuthResponseCustom> | null;
};

export const defaultContext = {
    user: null,
    session: null,
    signUpNewUser: () => null,
    signInUser: () => null,
    signInUserGoogle: () => null,
    signOut: () => null
};
