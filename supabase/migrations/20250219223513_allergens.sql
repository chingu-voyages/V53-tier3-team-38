CREATE TABLE IF NOT EXISTS  public.user_allergens (
    user_id uuid NOT NULL,
    allergen_name text NOT NULL,
    notes text,
    CONSTRAINT user_allergens_pk PRIMARY KEY (user_id, allergen_name),
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT allergen_fk FOREIGN KEY (allergen_name)
        REFERENCES public.allergens (name)
        ON DELETE RESTRICT ON UPDATE CASCADE
);