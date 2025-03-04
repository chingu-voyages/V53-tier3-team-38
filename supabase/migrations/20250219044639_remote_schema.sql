drop policy "Enable read access for all users" on "public"."TodoList";

revoke delete on table "public"."TodoList" from "anon";

revoke insert on table "public"."TodoList" from "anon";

revoke references on table "public"."TodoList" from "anon";

revoke select on table "public"."TodoList" from "anon";

revoke trigger on table "public"."TodoList" from "anon";

revoke truncate on table "public"."TodoList" from "anon";

revoke update on table "public"."TodoList" from "anon";

revoke delete on table "public"."TodoList" from "authenticated";

revoke insert on table "public"."TodoList" from "authenticated";

revoke references on table "public"."TodoList" from "authenticated";

revoke select on table "public"."TodoList" from "authenticated";

revoke trigger on table "public"."TodoList" from "authenticated";

revoke truncate on table "public"."TodoList" from "authenticated";

revoke update on table "public"."TodoList" from "authenticated";

revoke delete on table "public"."TodoList" from "service_role";

revoke insert on table "public"."TodoList" from "service_role";

revoke references on table "public"."TodoList" from "service_role";

revoke select on table "public"."TodoList" from "service_role";

revoke trigger on table "public"."TodoList" from "service_role";

revoke truncate on table "public"."TodoList" from "service_role";

revoke update on table "public"."TodoList" from "service_role";

alter table "public"."TodoList" drop constraint "TodoList_pkey";

drop index if exists "public"."TodoList_pkey";

drop table "public"."TodoList";


