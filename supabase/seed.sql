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
    ('Ratatouille', 555);

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
