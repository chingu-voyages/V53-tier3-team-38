INSERT INTO public.roles (name) VALUES ('admin'), ('manager'), ('staff');

INSERT INTO public.dishes (name, calories) VALUES
    ('Mezze Platter', 555),
    ('Seafood Paella Valencia', 555),
    ('Herb-Crusted Rack of Lamb', 555),
    ('Grilled Branzino', 555),
    ('Moussaka', 555),
    ('Linguine alle Vongole', 555),
    ('Korean BBQ Bao', 555),
    ('Thai-Style Ramen', 555),
    ('Cochinita Pibil', 555),
    ('Mole Negro con Pollo', 555),
    ('Southern Fried Chicken', 555),
    ('Biryani Hyderabadi', 555),
    ('Ratatouille', 555),
    ('Grilled Salmon', 450),
    ('Vegetable Stir Fry', 300),
    ('Chicken Pasta', 550),
    ('Quinoa Bowl', 400),
    ('Grilled Chicken', 350);

INSERT INTO public.meals_calendar (date, is_day_off, meal_title) VALUES 
    ('2/17/2025', false, 'Mediterranean Feast'),
    ('2/18/2025', false, 'Italian Delight'), 
    ('2/19/2025', false, 'Asian Fusion'), 
    ('2/20/2025', false, 'Mexican Fiesta'), 
    ('2/21/2025', false, 'American Classics'), 
    ('2/22/2025', false, 'Indian Spices'),
    ('2/23/2025', false, 'French Cuisine');

INSERT INTO public.meal_dishes (meal_date, dish_name) VALUES 
    ('2/17/2025', 'Mezze Platter'),
    ('2/17/2025', 'Seafood Paella Valencia'),
    ('2/17/2025', 'Herb-Crusted Rack of Lamb'),
    ('2/17/2025', 'Grilled Branzino'),
    ('2/17/2025', 'Moussaka'),
    ('2/18/2025', 'Linguine alle Vongole'), 
    ('2/19/2025', 'Korean BBQ Bao'), 
    ('2/19/2025', 'Thai-Style Ramen'), 
    ('2/20/2025', 'Cochinita Pibil'),
    ('2/20/2025', 'Mole Negro con Pollo'),
    ('2/21/2025', 'Southern Fried Chicken'), 
    ('2/22/2025', 'Biryani Hyderabadi'),
    ('2/23/2025', 'Ratatouille');

INSERT INTO public.allergens (name) VALUES
    ('Fish'),
    ('Soy'),
    ('Gluten'),
    ('Dairy');

INSERT INTO public.ingredients (name, name_allergens) VALUES
    ('Salmon', 'Fish'),
    ('Lemon', null),
    ('Herbs', null),
    ('Broccoli', null),
    ('Carrots', null),
    ('Tofu', 'Soy'),
    ('Soy Sauce', 'Gluten'),
    ('Pasta', 'Gluten'),
    ('Chicken', null),
    ('Cream', 'Dairy'),
    ('Quinoa', null),
    ('Vegetables', null),
    ('Olive Oil', null);

INSERT INTO public.dish_ingredients (dish_name, ingredient_name) VALUES
    ('Grilled Salmon', 'Salmon'),
    ('Grilled Salmon', 'Lemon'),
    ('Grilled Salmon', 'Herbs'),
    ('Vegetable Stir Fry', 'Broccoli'),
    ('Vegetable Stir Fry', 'Carrots'),
    ('Vegetable Stir Fry', 'Tofu'),
    ('Vegetable Stir Fry', 'Soy Sauce'),
    ('Chicken Pasta', 'Pasta'),
    ('Chicken Pasta', 'Chicken'),
    ('Chicken Pasta', 'Cream'),
    ('Quinoa Bowl', 'Quinoa'),
    ('Quinoa Bowl', 'Vegetables'),
    ('Quinoa Bowl', 'Olive Oil'),
    ('Grilled Chicken', 'Chicken'),
    ('Grilled Chicken', 'Herbs'),
    ('Grilled Chicken', 'Olive Oil');

-- INSERT INTO public.user_details (user_id, display_name, avatar_url) VALUES
--     ('0b1ea542-54b2-41dc-a360-8505820c8cae', 'Sarah Johnson', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
--     ('46239a0f-8ec8-4d29-bfab-13090365439a', 'Mike Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
--     ('c851554b-8b00-49c4-8340-d03f8e6620ef', 'Emily Rodriguez', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
--     ('e40f15fa-302e-41a4-9b69-6a79ce6fb3a2', 'James Wilson', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
--     ('58208ca9-c52a-4f0c-8955-0a1da8c64c1b', 'Alice Thompson', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

-- INSERT INTO public.user_allergens (user_id, allergen_name, notes) VALUES 
--     ('0b1ea542-54b2-41dc-a360-8505820c8cae', 'Shellfish', 'Avoid all seafood contact'),
--     ('0b1ea542-54b2-41dc-a360-8505820c8cae', 'Peanuts', 'Including peanut oil'),
--     ('46239a0f-8ec8-4d29-bfab-13090365439a', 'Dairy', 'Lactose intolerant');

-- INSERT INTO public.user_allergens (user_id, allergen_name, notes) VALUES 
--     ('c851554b-8b00-49c4-8340-d03f8e6620ef', 'Tree Nuts', 'All types of tree nuts'),
--     ('58208ca9-c52a-4f0c-8955-0a1da8c64c1b', 'Soy', 'Including soy sauce');