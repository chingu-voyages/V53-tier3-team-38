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
