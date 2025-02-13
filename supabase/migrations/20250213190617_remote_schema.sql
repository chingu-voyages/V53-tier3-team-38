create table "public"."TodoList" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "isCompleted" boolean not null default false
);


alter table "public"."TodoList" enable row level security;

create table "public"."roles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "role_name" text not null default 'user'::text
);


create table "public"."user_roles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "role_id" bigint
);


CREATE UNIQUE INDEX "TodoList_pkey" ON public."TodoList" USING btree (id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (id);

alter table "public"."TodoList" add constraint "TodoList_pkey" PRIMARY KEY using index "TodoList_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."user_roles" add constraint "user_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."user_roles" validate constraint "user_roles_role_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

create or replace view "public"."user_roles_view" as  SELECT ur.user_id,
    array_agg(r.role_name) AS role_names
   FROM (user_roles ur
     JOIN roles r ON ((ur.role_id = r.id)))
  GROUP BY ur.user_id;


grant delete on table "public"."TodoList" to "anon";

grant insert on table "public"."TodoList" to "anon";

grant references on table "public"."TodoList" to "anon";

grant select on table "public"."TodoList" to "anon";

grant trigger on table "public"."TodoList" to "anon";

grant truncate on table "public"."TodoList" to "anon";

grant update on table "public"."TodoList" to "anon";

grant delete on table "public"."TodoList" to "authenticated";

grant insert on table "public"."TodoList" to "authenticated";

grant references on table "public"."TodoList" to "authenticated";

grant select on table "public"."TodoList" to "authenticated";

grant trigger on table "public"."TodoList" to "authenticated";

grant truncate on table "public"."TodoList" to "authenticated";

grant update on table "public"."TodoList" to "authenticated";

grant delete on table "public"."TodoList" to "service_role";

grant insert on table "public"."TodoList" to "service_role";

grant references on table "public"."TodoList" to "service_role";

grant select on table "public"."TodoList" to "service_role";

grant trigger on table "public"."TodoList" to "service_role";

grant truncate on table "public"."TodoList" to "service_role";

grant update on table "public"."TodoList" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";

create policy "Enable read access for all users"
on "public"."TodoList"
as permissive
for select
to public
using (true);



