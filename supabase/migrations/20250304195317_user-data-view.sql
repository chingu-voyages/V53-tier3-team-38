DROP VIEW IF EXISTS public.user_allergen_view;

CREATE OR REPLACE VIEW public.user_allergen_view AS
SELECT 
    u.id AS user_id,
    ud.display_name AS name,
    u.email,
    ud.avatar_url,
    CASE WHEN ur.role_name = 'admin' THEN true ELSE false END as isAdmin,
    COALESCE(json_agg(
        json_build_object(
            'name', a.name,
            'notes', ua.notes
        )
    ) FILTER (WHERE a.name IS NOT NULL), '[]'::json) AS allergen_info
FROM auth.users u
LEFT JOIN public.user_details ud ON ud.user_id = u.id
LEFT JOIN public.user_roles ur ON ur.user_id = u.id
LEFT JOIN public.user_allergens ua ON u.id = ua.user_id
LEFT JOIN public.allergens a ON ua.allergen_name = a.name
WHERE ud.display_name IS NOT NULL
GROUP BY
    u.id,
    ud.display_name,
    u.email,
    ud.avatar_url,
    ur.role_name;

GRANT SELECT ON public.user_allergen_view TO authenticated;
GRANT SELECT ON public.user_allergen_view TO service_role;
