DROP VIEW IF EXISTS public.meal_calendar_view;

CREATE OR REPLACE VIEW public.meal_calendar_view AS
WITH dish_info AS (
    SELECT 
        d.name,
        d.calories,
        COALESCE(json_agg(i.name) FILTER (WHERE i.name IS NOT NULL), '[]'::json) as ingredients,
        COALESCE(json_agg(i.name_allergens) FILTER (WHERE i.name_allergens IS NOT NULL), '[]'::json) as allergens
    FROM public.dishes d
    LEFT JOIN public.dish_ingredients di ON di.dish_name = d.name
    LEFT JOIN public.ingredients i ON i.name = di.ingredient_name
    GROUP BY d.name, d.calories
)
SELECT 
    mc.date,
    mc.is_day_off AS isDayOff,
    json_agg(
        json_build_object(
            'name', md.dish_name,
            'calories', di.calories,
            'ingredients', di.ingredients,
            'allergens', di.allergens
        )
    ) AS dishes
FROM public.meals_calendar mc
LEFT JOIN public.meal_dishes md ON md.meal_date = mc.date
LEFT JOIN dish_info di ON di.name = md.dish_name
GROUP BY
    mc.date,
    mc.is_day_off;

GRANT SELECT ON public.meal_calendar_view TO authenticated;
GRANT SELECT ON public.meal_calendar_view TO service_role;
