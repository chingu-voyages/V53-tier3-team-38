ALTER TABLE public.meals_calendar
    DROP COLUMN IF EXISTS name_dishes,
    ADD COLUMN IF NOT EXISTS meal_title text;

ALTER TABLE public.meals_calendar
    DROP CONSTRAINT IF EXISTS dishes_fk;

CREATE TABLE IF NOT EXISTS public.meal_dishes (
    meal_date date NOT NULL,
    dish_name text NOT NULL,
    CONSTRAINT meal_dishes_pk PRIMARY KEY (meal_date, dish_name),
    CONSTRAINT meal_fk FOREIGN KEY (meal_date)
        REFERENCES public.meals_calendar (date)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT dish_fk FOREIGN KEY (dish_name)
        REFERENCES public.dishes (name)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE OR REPLACE VIEW public.fetch_dashboard_data AS
    SELECT TO_CHAR(date, 'Dy') as day, date, meal_title as mealTitle, COUNT(*) as dishCount
    FROM public.meals_calendar mc
    JOIN public.meal_dishes md ON md.meal_date = mc.date
    GROUP BY 
    TO_CHAR(date, 'Dy'), date, meal_title
    ORDER BY date
    LIMIT 7;

