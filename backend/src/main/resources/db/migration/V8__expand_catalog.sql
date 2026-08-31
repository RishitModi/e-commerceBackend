-- V8__expand_catalog.sql
-- Expand catalog: add 8 new categories and many new products

-- 1) Insert 8 new categories
INSERT INTO categories (name) VALUES
  ('Snacks'),
  ('Frozen Foods'),
  ('Household Essentials'),
  ('Personal Care'),
  ('Breakfast & Cereal'),
  ('Condiments & Sauces'),
  ('International Foods'),
  ('Baby Care');

-- 2) Add 15 new products to each of 6 EXISTING categories using subqueries for category_id

-- Produce
INSERT INTO products (name, price, description, category_id) VALUES
  ('Carrots', 1.29, 'Sweet and crunchy carrots sold per pound.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Spinach', 2.49, 'Fresh baby spinach, ideal for salads and cooking.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Avocados', 1.79, 'Creamy Hass avocados sold per piece.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Strawberries', 3.99, 'Ripe strawberries in a pint container.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Broccoli', 1.89, 'Fresh broccoli crowns, great steamed or roasted.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Potatoes', 0.99, 'All-purpose potatoes sold per pound.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Bell Peppers', 1.49, 'Colorful bell peppers — red, yellow, or green.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Cucumbers', 0.79, 'Crisp cucumbers for salads and snacking.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Tomatoes', 1.59, 'Vine-ripened tomatoes, juicy and flavorful.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Onions', 0.89, 'Yellow onions for cooking, sold per pound.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Garlic', 0.50, 'Fresh garlic cloves sold per bulb.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Lettuce', 1.19, 'Crisp head lettuce, perfect for salads.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Blueberries', 3.49, 'Sweet blueberries in a pint container.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Grapes', 2.99, 'Seedless grapes sold per pound.', (SELECT id FROM categories WHERE name = 'Produce')),
  ('Zucchini', 1.09, 'Fresh zucchini squash sold per pound.', (SELECT id FROM categories WHERE name = 'Produce'));

-- Dairy
INSERT INTO products (name, price, description, category_id) VALUES
  ('Greek Yogurt', 1.49, 'Thick and creamy plain Greek yogurt single serving.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Butter', 3.99, 'Creamy salted butter, 8 oz stick.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Eggs', 2.99, 'One dozen large eggs from cage-free hens.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Cream Cheese', 2.49, 'Smooth cream cheese, great for spreads and baking.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Sour Cream', 1.99, 'Tangy sour cream for dips and toppings.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Almond Milk', 2.99, 'Unsweetened almond milk, 1L carton.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Mozzarella', 4.50, 'Mild mozzarella block, perfect for melting.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Cottage Cheese', 2.79, 'Low-fat cottage cheese for snacks and recipes.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Parmesan Cheese', 5.99, 'Aged grated Parmesan for pasta and salads.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Heavy Cream', 3.49, 'Rich heavy cream for cooking and desserts.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Vanilla Yogurt', 1.39, 'Creamy vanilla-flavored yogurt single serving.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Swiss Cheese', 4.25, 'Nutty Swiss cheese slices.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Half and Half', 2.29, 'Half and half for coffee and recipes.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Feta Cheese', 3.99, 'Crumbled feta cheese for salads and Mediterranean dishes.', (SELECT id FROM categories WHERE name = 'Dairy')),
  ('Goat Cheese', 4.75, 'Soft goat cheese with a tangy flavor.', (SELECT id FROM categories WHERE name = 'Dairy'));

-- Bakery
INSERT INTO products (name, price, description, category_id) VALUES
  ('Bagels', 2.99, 'Fresh baked bagels, pack of 6.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Croissants', 3.49, 'Buttery flaky croissants, pack of 4.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Baguette', 2.25, 'Crispy French baguette, freshly baked.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Muffins', 3.99, 'Assorted muffins, pack of 4.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Dinner Rolls', 2.49, 'Soft dinner rolls, pack of 8.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Tortillas', 2.79, 'Soft flour tortillas, pack of 10.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Pita Bread', 2.29, 'Round pita pockets, pack of 6.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Cinnamon Rolls', 4.50, 'Sweet cinnamon rolls with icing, pack of 6.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Rye Bread', 3.25, 'Hearty rye bread loaf.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Whole Wheat Bread', 2.99, 'Whole wheat sandwich bread loaf.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Donuts', 2.99, 'Glazed donuts, pack of 6.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('English Muffins', 2.79, 'Toasted English muffins, pack of 6.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Ciabatta', 3.75, 'Rustic ciabatta loaf with airy crumb.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Brioche', 4.50, 'Rich and buttery brioche loaf.', (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Sandwich Bread', 2.49, 'Classic white sandwich bread loaf.', (SELECT id FROM categories WHERE name = 'Bakery'));

-- Meat & Seafood
INSERT INTO products (name, price, description, category_id) VALUES
  ('Salmon Fillet', 12.99, 'Fresh salmon fillet, rich in omega-3s per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Ground Turkey', 5.49, 'Lean ground turkey, excellent for recipes.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Bacon', 6.99, 'Smoked bacon strips, savory and crisp.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Pork Chops', 7.49, 'Bone-in pork chops sold per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Shrimp', 9.99, 'Large shrimp, peeled and deveined per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Chicken Thighs', 4.99, 'Juicy chicken thighs, bone-in per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Tilapia', 8.49, 'Mild tilapia fillets per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Turkey Deli Slices', 5.99, 'Sliced turkey deli meat, great for sandwiches.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Ham', 6.49, 'Sliced ham for sandwiches and meals.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Sausages', 5.99, 'Seasoned sausages per package.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Lamb Chops', 14.99, 'Tender lamb chops sold per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Crab Meat', 13.99, 'Sweet crab meat for salads and recipes.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Chicken Wings', 6.99, 'Party-ready chicken wings per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Steak', 15.99, 'Premium steak cut sold per pound.', (SELECT id FROM categories WHERE name = 'Meat & Seafood')),
  ('Cod Fillet', 11.49, 'Flaky cod fillet, great for baking or frying.', (SELECT id FROM categories WHERE name = 'Meat & Seafood'));

-- Pantry Staples
INSERT INTO products (name, price, description, category_id) VALUES
  ('Pasta', 1.99, 'Dry pasta for everyday meals, 16 oz.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Canned Tomatoes', 1.49, 'Whole peeled canned tomatoes for sauces.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Peanut Butter', 3.99, 'Creamy peanut butter jar, 16 oz.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Honey', 6.49, 'Pure natural honey jar.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Black Beans', 1.29, 'Canned black beans, ready to use.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Quinoa', 4.99, 'Ancient grain quinoa, 1 lb bag.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Olive Oil Spray', 5.49, 'Olive oil cooking spray for healthy cooking.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('All-Purpose Flour', 2.49, 'Versatile all-purpose flour, 5 lb bag.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('White Rice', 3.99, 'Long-grain white rice, 2 lb bag.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Lentils', 2.29, 'Dried lentils for soups and stews.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Chickpeas', 1.29, 'Canned chickpeas for hummus and salads.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Sugar', 2.19, 'Granulated white sugar, 4 lb bag.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Baking Soda', 1.49, 'Baking soda for baking and cleaning.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Vegetable Oil', 3.29, 'Neutral vegetable oil for cooking, 48 oz.', (SELECT id FROM categories WHERE name = 'Pantry Staples')),
  ('Canned Corn', 1.19, 'Sweet canned corn, ready to eat.', (SELECT id FROM categories WHERE name = 'Pantry Staples'));

-- Beverages
INSERT INTO products (name, price, description, category_id) VALUES
  ('Sparkling Water', 1.49, 'Refreshing sparkling water, 12 oz can.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Cold Brew Coffee', 3.99, 'Smooth cold brew coffee, ready to drink.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Green Tea', 2.99, 'Organic green tea bags.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Coconut Water', 2.49, 'Hydrating coconut water, 1L carton.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Lemonade', 1.99, 'Fresh lemonade beverage, 16 oz.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Almond Milk Latte', 3.49, 'Ready-to-drink almond milk latte.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Kombucha', 3.99, 'Fermented kombucha drink, 16 oz bottle.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Orange Soda', 1.29, 'Sweet orange soda, 12 oz can.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Apple Juice', 2.49, '100% apple juice, 1L bottle.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Iced Tea', 1.99, 'Chilled iced tea, 16 oz bottle.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Energy Drink', 2.99, 'Boosting energy drink, 12 oz can.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Bottled Water', 0.99, 'Pure bottled water, 16.9 oz.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Grape Juice', 2.79, 'Sweet grape juice, 1L bottle.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Root Beer', 1.29, 'Classic root beer soda, 12 oz can.', (SELECT id FROM categories WHERE name = 'Beverages')),
  ('Ginger Ale', 1.29, 'Crisp ginger ale, 12 oz can.', (SELECT id FROM categories WHERE name = 'Beverages'));

-- 3) Add 15 products to each of the 8 NEW categories using subquery pattern

-- Snacks
INSERT INTO products (name, price, description, category_id) VALUES
  ('Tortilla Chips', 2.99, 'Crispy tortilla chips great with salsa.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Mixed Nuts', 6.99, 'Assorted mixed nuts, roasted and lightly salted.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Popcorn', 2.49, 'Buttery microwave popcorn, 3 pack.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Granola Bars', 3.99, 'Fiber-rich granola bars, pack of 6.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Pretzels', 1.99, 'Crunchy salted pretzels, snack bag.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Trail Mix', 4.99, 'Sweet and salty trail mix, snack pack.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Rice Cakes', 2.49, 'Light rice cakes, multipack.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Dried Fruit', 3.49, 'Assorted dried fruit, great for snacking.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Cheese Crackers', 2.99, 'Savory cheese crackers, snack pack.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Beef Jerky', 7.99, 'Smoky beef jerky for protein-packed snacking.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Fruit Snacks', 2.49, 'Sweet fruit snacks, kid-friendly.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Corn Chips', 2.99, 'Crunchy corn chips for dipping.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Chocolate Bars', 1.49, 'Classic chocolate bars for a sweet treat.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Veggie Chips', 3.49, 'Baked veggie chips as a healthier alternative.', (SELECT id FROM categories WHERE name = 'Snacks')),
  ('Popcorn Kernels', 2.29, 'Bag of popping corn kernels for stovetop popcorn.', (SELECT id FROM categories WHERE name = 'Snacks'));

-- Frozen Foods
INSERT INTO products (name, price, description, category_id) VALUES
  ('Frozen Pizza', 5.99, 'Ready-to-bake frozen pizza with cheese and toppings.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Berries', 4.49, 'Mixed frozen berries for smoothies and baking.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Ice Cream', 4.99, 'Creamy ice cream pint, multiple flavors available.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Vegetable Mix', 2.99, 'Mixed vegetables frozen for convenience.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Waffles', 3.49, 'Crispy frozen waffles, pack of 8.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Burritos', 4.99, 'Hearty frozen burritos for quick meals.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Chicken Nuggets', 5.49, 'Crispy frozen chicken nuggets, family pack.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Shrimp', 9.99, 'Frozen shrimp, peeled and ready to cook.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen French Fries', 3.99, 'Crispy frozen french fries for baking or frying.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Lasagna', 7.99, 'Family-size frozen lasagna ready to bake.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Dumplings', 4.99, 'Frozen dumplings for quick Asian-inspired meals.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Fish Sticks', 3.99, 'Breaded fish sticks, kid-friendly.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Peas', 1.99, 'Sweet frozen peas, 12 oz bag.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Mango Chunks', 3.99, 'Sweet frozen mango chunks for smoothies.', (SELECT id FROM categories WHERE name = 'Frozen Foods')),
  ('Frozen Yogurt Bars', 4.49, 'Individual frozen yogurt bars for a light dessert.', (SELECT id FROM categories WHERE name = 'Frozen Foods'));

-- Household Essentials
INSERT INTO products (name, price, description, category_id) VALUES
  ('Paper Towels', 6.99, 'Absorbent paper towels, multi-roll pack.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Dish Soap', 2.99, 'Grease-cutting dish soap bottle.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Laundry Detergent', 9.99, 'Powerful laundry detergent for all machines.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Trash Bags', 7.49, 'Durable trash bags for household use.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Aluminum Foil', 2.49, 'Standard aluminum foil roll for cooking and storage.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Sponges', 1.99, 'Multi-pack cleaning sponges.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('All-Purpose Cleaner', 3.99, 'Versatile cleaner for surfaces around the home.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Toilet Paper', 8.49, 'Soft toilet paper, multi-roll pack.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Plastic Wrap', 2.29, 'Cling plastic wrap for food storage.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Fabric Softener', 5.49, 'Liquid fabric softener for softer laundry.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Glass Cleaner', 3.19, 'Streak-free glass cleaner spray.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Air Freshener', 2.99, 'Long-lasting air freshener spray.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Dishwasher Pods', 8.99, 'Convenient dishwasher pods for clean dishes.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Storage Bags', 3.49, 'Resealable storage bags, assorted sizes.', (SELECT id FROM categories WHERE name = 'Household Essentials')),
  ('Disinfecting Wipes', 4.99, 'Alcohol-based disinfecting wipes for surfaces.', (SELECT id FROM categories WHERE name = 'Household Essentials'));

-- Personal Care
INSERT INTO products (name, price, description, category_id) VALUES
  ('Toothpaste', 2.99, 'Fluoride toothpaste for daily oral care.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Shampoo', 4.99, 'Nourishing shampoo for all hair types.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Body Wash', 3.99, 'Gentle body wash with moisturizing properties.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Deodorant', 2.49, 'Long-lasting deodorant for everyday protection.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Hand Soap', 1.99, 'Antibacterial hand soap pump bottle.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Sunscreen', 7.99, 'Broad-spectrum sunscreen for skin protection.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Razors', 6.99, 'Multi-blade razors for a close shave.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Cotton Swabs', 1.29, 'Cotton swabs for hygiene and cleaning.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Conditioner', 4.99, 'Hydrating conditioner for smooth hair.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Toothbrush', 2.49, 'Soft-bristle toothbrush for daily use.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Mouthwash', 3.99, 'Refreshing mouthwash for oral hygiene.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Lip Balm', 1.99, 'Moisturizing lip balm with SPF.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Hand Lotion', 4.49, 'Hydrating hand lotion for dry skin.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Facial Tissues', 1.99, 'Soft facial tissues, box of 100.', (SELECT id FROM categories WHERE name = 'Personal Care')),
  ('Nail Clippers', 3.49, 'Stainless steel nail clippers for grooming.', (SELECT id FROM categories WHERE name = 'Personal Care'));

-- Breakfast & Cereal
INSERT INTO products (name, price, description, category_id) VALUES
  ('Corn Flakes', 3.49, 'Crispy corn flakes for a quick breakfast.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Oatmeal', 4.99, 'Whole rolled oats for warm breakfasts.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Granola', 5.49, 'Crunchy granola with nuts and dried fruit.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Pancake Mix', 2.99, 'Easy pancake mix for fluffy pancakes.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Maple Syrup', 6.99, 'Pure maple syrup for pancakes and waffles.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Breakfast Bars', 3.99, 'Portable breakfast bars for on-the-go mornings.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Bran Cereal', 3.49, 'High-fiber bran cereal.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Waffle Mix', 3.29, 'Waffle mix for quick homemade waffles.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Muesli', 6.49, 'Healthy muesli blend with nuts and fruit.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Instant Oatmeal Packets', 4.29, 'Single-serve instant oatmeal packets.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Cereal Bars', 3.79, 'Snackable cereal bars, pack of 6.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Honey Nut Cereal', 4.19, 'Sweet honey nut flavored cereal.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Rice Cereal', 2.99, 'Gentle rice cereal, great for toddlers.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Chia Seeds', 7.49, 'Nutrient-dense chia seeds for breakfasts and smoothies.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal')),
  ('Breakfast Sausage', 4.99, 'Savory breakfast sausage links.', (SELECT id FROM categories WHERE name = 'Breakfast & Cereal'));

-- Condiments & Sauces
INSERT INTO products (name, price, description, category_id) VALUES
  ('Ketchup', 2.49, 'Classic tomato ketchup for burgers and fries.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Mustard', 1.99, 'Tangy yellow mustard for sandwiches.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Mayonnaise', 3.49, 'Creamy mayonnaise spread for sandwiches.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Soy Sauce', 2.99, 'Salty soy sauce for Asian cooking and dipping.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Hot Sauce', 2.99, 'Spicy hot sauce to add heat to dishes.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('BBQ Sauce', 3.49, 'Smoky BBQ sauce for grilling and dipping.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Salad Dressing', 3.99, 'Creamy or vinaigrette dressings for salads.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Salsa', 2.99, 'Chunky salsa perfect with chips or tacos.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Worcestershire Sauce', 3.29, 'Savory Worcestershire sauce for marinades and sauces.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Pasta Sauce', 4.49, 'Rich tomato pasta sauce with herbs.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Pesto', 5.49, 'Basil pesto for pasta and spreads.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Sriracha', 3.99, 'Spicy Sriracha sauce for heat lovers.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Vinegar', 2.49, 'Distilled white or apple cider vinegar.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Teriyaki Sauce', 3.99, 'Sweet and savory teriyaki sauce.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces')),
  ('Tartar Sauce', 2.99, 'Creamy tartar sauce for seafood.', (SELECT id FROM categories WHERE name = 'Condiments & Sauces'));

-- International Foods
INSERT INTO products (name, price, description, category_id) VALUES
  ('Curry Paste', 3.99, 'Flavorful curry paste for authentic dishes.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Corn Tortillas', 2.49, 'Soft corn tortillas for tacos and wraps.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Kimchi', 4.99, 'Fermented spicy kimchi, traditional Korean side.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Miso Paste', 3.99, 'Savory miso paste for soups and marinades.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Basmati Rice', 5.99, 'Aromatic basmati rice for international cuisines.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Coconut Milk', 2.49, 'Creamy coconut milk for curries and soups.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Naan Bread', 2.99, 'Soft naan bread for meals and dipping.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Falafel Mix', 3.49, 'Ready falafel mix to make crispy falafels.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Rice Noodles', 2.99, 'Thin rice noodles for stir-fries and soups.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Hummus', 3.99, 'Creamy hummus made from chickpeas.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Tahini', 4.49, 'Sesame tahini paste for dressings and dips.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Gochujang', 5.49, 'Spicy Korean chili paste for marinades and sauces.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Dumpling Wrappers', 2.49, 'Round dumpling wrappers for homemade dumplings.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Ramen Noodles', 2.99, 'Instant or fresh ramen noodles for quick meals.', (SELECT id FROM categories WHERE name = 'International Foods')),
  ('Tamarind Paste', 3.99, 'Tamarind paste for sweet and tangy flavors.', (SELECT id FROM categories WHERE name = 'International Foods'));

-- Baby Care
INSERT INTO products (name, price, description, category_id) VALUES
  ('Diapers', 19.99, 'Absorbent diapers in assorted sizes.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Wipes', 4.99, 'Gentle baby wipes for sensitive skin.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Formula', 24.99, 'Nutritious baby formula for infants.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Food Pouches', 2.49, 'Convenient pureed baby food pouches.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Shampoo', 3.99, 'Tear-free baby shampoo for gentle cleansing.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Teething Rings', 5.49, 'Soothing teething rings for infants.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Lotion', 5.99, 'Moisturizing baby lotion for soft skin.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Pacifiers', 3.49, 'BPA-free pacifiers in a twin pack.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Bottles', 9.99, 'Durable baby bottles with slow-flow nipples.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Powder', 3.49, 'Gentle baby powder for skin care.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Bibs', 6.99, 'Easy-clean baby bibs to protect clothing.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Sunscreen', 7.99, 'SPF-rated baby sunscreen for delicate skin.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Cereal', 4.49, 'Iron-fortified baby cereal for weaning.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Diaper Cream', 5.49, 'Soothing diaper cream for rash relief.', (SELECT id FROM categories WHERE name = 'Baby Care')),
  ('Baby Wash', 4.99, 'Gentle baby wash for bath time.', (SELECT id FROM categories WHERE name = 'Baby Care'));
