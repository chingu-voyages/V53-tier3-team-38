-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.6
-- PostgreSQL version: 16.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: "menu scheduler" | type: DATABASE --
-- DROP DATABASE IF EXISTS "menu scheduler";
CREATE DATABASE "menu scheduler";
-- ddl-end --


-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	display_name text,
	email varchar,
	phone text,
	raw_app_meta_data jsonb,
	last_sign_in_at timestamptz,
	created_at timestamptz,
	updated_at timestamptz,
	email_confirmed_at timestamptz,
	deleted_at timestamptz,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.roles | type: TABLE --
-- DROP TABLE IF EXISTS public.roles CASCADE;
CREATE TABLE public.roles (
	name text NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (name)
);
-- ddl-end --
ALTER TABLE public.roles OWNER TO postgres;
-- ddl-end --

-- object: public.dishes | type: TABLE --
-- DROP TABLE IF EXISTS public.dishes CASCADE;
CREATE TABLE public.dishes (
	name text NOT NULL,
	ingredients text[],
	calories integer NOT NULL DEFAULT 0,
	CONSTRAINT dishes_pk PRIMARY KEY (name)
);
-- ddl-end --
ALTER TABLE public.dishes OWNER TO postgres;
-- ddl-end --

-- object: public.ingredients | type: TABLE --
-- DROP TABLE IF EXISTS public.ingredients CASCADE;
CREATE TABLE public.ingredients (
	name text NOT NULL,
	name_allergens text,
	CONSTRAINT ingredients_pk PRIMARY KEY (name)
);
-- ddl-end --
ALTER TABLE public.ingredients OWNER TO postgres;
-- ddl-end --

-- object: public.allergens | type: TABLE --
-- DROP TABLE IF EXISTS public.allergens CASCADE;
CREATE TABLE public.allergens (
	name text NOT NULL,
	CONSTRAINT allergens_pk PRIMARY KEY (name)
);
-- ddl-end --
ALTER TABLE public.allergens OWNER TO postgres;
-- ddl-end --

-- object: allergens_fk | type: CONSTRAINT --
-- ALTER TABLE public.ingredients DROP CONSTRAINT IF EXISTS allergens_fk CASCADE;
ALTER TABLE public.ingredients ADD CONSTRAINT allergens_fk FOREIGN KEY (name_allergens)
REFERENCES public.allergens (name) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.meals_calendar | type: TABLE --
-- DROP TABLE IF EXISTS public.meals_calendar CASCADE;
CREATE TABLE public.meals_calendar (
	date date NOT NULL,
	is_day_off boolean NOT NULL DEFAULT false,
	name_dishes text,
	CONSTRAINT meals_calendar_pk PRIMARY KEY (date)
);
-- ddl-end --
ALTER TABLE public.meals_calendar OWNER TO postgres;
-- ddl-end --

-- object: dishes_fk | type: CONSTRAINT --
-- ALTER TABLE public.meals_calendar DROP CONSTRAINT IF EXISTS dishes_fk CASCADE;
ALTER TABLE public.meals_calendar ADD CONSTRAINT dishes_fk FOREIGN KEY (name_dishes)
REFERENCES public.dishes (name) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.many_roles_has_many_users | type: TABLE --
-- DROP TABLE IF EXISTS public.many_roles_has_many_users CASCADE;
CREATE TABLE public.many_roles_has_many_users (
	name_roles text NOT NULL,
	id_users uuid NOT NULL,
	CONSTRAINT many_roles_has_many_users_pk PRIMARY KEY (name_roles,id_users)
);
-- ddl-end --

-- object: roles_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_roles_has_many_users DROP CONSTRAINT IF EXISTS roles_fk CASCADE;
ALTER TABLE public.many_roles_has_many_users ADD CONSTRAINT roles_fk FOREIGN KEY (name_roles)
REFERENCES public.roles (name) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_roles_has_many_users DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.many_roles_has_many_users ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.roles_enum | type: TYPE --
-- DROP TYPE IF EXISTS public.roles_enum CASCADE;
CREATE TYPE public.roles_enum AS
ENUM ('admin','manager','staff');
-- ddl-end --
ALTER TYPE public.roles_enum OWNER TO postgres;
-- ddl-end --

-- object: ingredients_fk | type: CONSTRAINT --
-- ALTER TABLE public.dishes DROP CONSTRAINT IF EXISTS ingredients_fk CASCADE;
ALTER TABLE public.dishes ADD CONSTRAINT ingredients_fk FOREIGN KEY (ingredients)
REFERENCES public.ingredients (name) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


