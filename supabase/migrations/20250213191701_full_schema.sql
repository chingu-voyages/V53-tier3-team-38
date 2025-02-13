DROP TABLE IF EXISTS public.TodoList CASCADE;

-- Create users table (uncomment if needed)
-- CREATE TABLE IF NOT EXISTS auth.users (
--     id uuid NOT NULL DEFAULT gen_random_uuid(),
--     display_name text,
--     email varchar,
--     phone text,
--     raw_app_meta_data jsonb,
--     last_sign_in_at timestamptz,
--     created_at timestamptz,
--     updated_at timestamptz,
--     email_confirmed_at timestamptz,
--     deleted_at timestamptz,
--     CONSTRAINT users_pk PRIMARY KEY (id)
-- );

-- Create roles enum type
CREATE TYPE public.roles_enum AS ENUM ('admin', 'manager', 'staff');

-- Create roles table
DROP TABLE IF EXISTS public.roles CASCADE;
CREATE TABLE public.roles (
    name text NOT NULL,
    CONSTRAINT roles_pk PRIMARY KEY (name)
);

-- Create allergens table
CREATE TABLE public.allergens (
    name text NOT NULL,
    CONSTRAINT allergens_pk PRIMARY KEY (name)
);

-- Create ingredients table
CREATE TABLE public.ingredients (
    name text NOT NULL,
    name_allergens text,
    CONSTRAINT ingredients_pk PRIMARY KEY (name),
    CONSTRAINT allergens_fk FOREIGN KEY (name_allergens)
        REFERENCES public.allergens (name) MATCH FULL
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create dishes table
CREATE TABLE public.dishes (
    name text NOT NULL,
    calories integer NOT NULL DEFAULT 0,
    CONSTRAINT dishes_pk PRIMARY KEY (name)
);

-- Create dish_ingredients junction table
CREATE TABLE public.dish_ingredients (
    dish_name text NOT NULL,
    ingredient_name text NOT NULL,
    CONSTRAINT dish_ingredients_pk PRIMARY KEY (dish_name, ingredient_name),
    CONSTRAINT dish_fk FOREIGN KEY (dish_name)
        REFERENCES public.dishes (name)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ingredient_fk FOREIGN KEY (ingredient_name)
        REFERENCES public.ingredients (name)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create meals_calendar table
CREATE TABLE public.meals_calendar (
    date date NOT NULL,
    is_day_off boolean NOT NULL DEFAULT false,
    name_dishes text,
    CONSTRAINT meals_calendar_pk PRIMARY KEY (date),
    CONSTRAINT dishes_fk FOREIGN KEY (name_dishes)
        REFERENCES public.dishes (name) MATCH FULL
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create user_roles table
DROP TABLE IF EXISTS public.user_roles CASCADE;
CREATE TABLE public.user_roles (
    role_name text NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT user_roles_pk PRIMARY KEY (role_name, user_id),
    CONSTRAINT roles_fk FOREIGN KEY (role_name)
        REFERENCES public.roles (name) MATCH FULL
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT users_fk FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH FULL
        ON DELETE RESTRICT ON UPDATE CASCADE
);