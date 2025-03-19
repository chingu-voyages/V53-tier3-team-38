CREATE TABLE IF NOT EXISTS public.user_details (
    user_id uuid NOT NULL,
    display_name text,
    avatar_url text,
    CONSTRAINT user_details_pk PRIMARY KEY (user_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE OR REPLACE VIEW public.user_allergen_view AS
SELECT 
    u.id AS user_id,
    ud.display_name,
    u.email,
    a.name AS allergen_name,
    ua.notes
FROM auth.users u
JOIN public.user_details ud ON ud.user_id = u.id
JOIN public.user_allergens ua ON u.id = ua.user_id
JOIN public.allergens a ON ua.allergen_name = a.name;
