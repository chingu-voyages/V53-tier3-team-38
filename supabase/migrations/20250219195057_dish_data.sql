CREATE OR REPLACE VIEW public.fetch_dish_data AS
    SELECT 
        d.name,
        d.calories,
        ARRAY_AGG(di.ingredient_name) as ingredients,
        COALESCE(ARRAY_AGG(i.name_allergens) FILTER (WHERE i.name_allergens IS NOT NULL), '{}') as allergens
    FROM public.dishes d
    JOIN public.dish_ingredients di ON d.name = di.dish_name
    JOIN public.ingredients i ON i.name = di.ingredient_name
    GROUP BY 
        d.name,
        d.calories;