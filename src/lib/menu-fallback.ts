export type MenuProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  featured?: boolean;
  available?: boolean;
};

/**
 * Visual catalogue fallback built from the supplied BITE RIOT seed catalogue.
 * Its ids use product slugs; the order API accepts either a database id or slug.
 */
export const fallbackMenuProducts: MenuProduct[] = [
  {
    "id": "bbq-backtalk",
    "slug": "bbq-backtalk",
    "name": "BBQ Backtalk",
    "description": "A toasted brioche bun stacked with fresh crunch, melted cheese and house-made sauce.",
    "category": "Burgers",
    "price": 6950,
    "image": "/images/menu/burgers/products/b-8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "cheese-please",
    "slug": "cheese-please",
    "name": "Cheese Please",
    "description": "A bold, juicy build with smoky notes, crisp greens and a buttery toasted bun.",
    "category": "Burgers",
    "price": 7200,
    "image": "/images/menu/burgers/products/b-9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "double-trouble",
    "slug": "double-trouble",
    "name": "Double Trouble",
    "description": "A toasted brioche bun stacked with fresh crunch, melted cheese and house-made sauce.",
    "category": "Burgers",
    "price": 5450,
    "image": "/images/menu/burgers/products/b-2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "firestarter-burger",
    "slug": "firestarter-burger",
    "name": "Firestarter",
    "description": "Hot pepper glaze, jalapeño, slaw and a serious kick.",
    "category": "Burgers",
    "price": 5800,
    "image": "/images/menu/burgers/products/b-4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "garden-riot",
    "slug": "garden-riot",
    "name": "Garden Riot",
    "description": "A bold, juicy build with smoky notes, crisp greens and a buttery toasted bun.",
    "category": "Burgers",
    "price": 6450,
    "image": "/images/menu/burgers/products/b-6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "mushroom-mayhem",
    "slug": "mushroom-mayhem",
    "name": "Mushroom Mayhem",
    "description": "A toasted brioche bun stacked with fresh crunch, melted cheese and house-made sauce.",
    "category": "Burgers",
    "price": 7700,
    "image": "/images/menu/burgers/products/b-11.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "smoke-signal",
    "slug": "smoke-signal",
    "name": "Smoke Signal",
    "description": "A toasted brioche bun stacked with fresh crunch, melted cheese and house-made sauce.",
    "category": "Burgers",
    "price": 6200,
    "image": "/images/menu/burgers/products/b-5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "the-big-noise",
    "slug": "the-big-noise",
    "name": "The Big Noise",
    "description": "Triple beef, smoked cheese, crispy onions and house sauce.",
    "category": "Burgers",
    "price": 6900,
    "image": "/images/menu/burgers/products/b-3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "the-crunch-boss",
    "slug": "the-crunch-boss",
    "name": "The Crunch Boss",
    "description": "Double smash patties, sharp cheddar, pickles and our signature riot sauce.",
    "category": "Burgers",
    "price": 7450,
    "image": "/images/menu/burgers/products/b-10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "the-riot-classic",
    "slug": "the-riot-classic",
    "name": "The Riot Classic",
    "description": "Double smash patty, American cheese, pickles and riot sauce.",
    "category": "Burgers",
    "price": 5200,
    "image": "/images/menu/burgers/products/b-1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "triple-threat",
    "slug": "triple-threat",
    "name": "Triple Threat",
    "description": "A bold, juicy build with smoky notes, crisp greens and a buttery toasted bun.",
    "category": "Burgers",
    "price": 7950,
    "image": "/images/menu/burgers/products/b-12.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "truffle-shuffle",
    "slug": "truffle-shuffle",
    "name": "Truffle Shuffle",
    "description": "Double smash patties, sharp cheddar, pickles and our signature riot sauce.",
    "category": "Burgers",
    "price": 6700,
    "image": "/images/menu/burgers/products/b-7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "buttermilk-crunch",
    "slug": "buttermilk-crunch",
    "name": "Buttermilk Crunch",
    "description": "Crispy, juicy chicken tossed in a punchy house glaze and finished with fresh herbs.",
    "category": "Chicken & Wings",
    "price": 6900,
    "image": "/images/menu/chicken-wings/products/c-w9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "crispy-chicken-bites",
    "slug": "crispy-chicken-bites",
    "name": "Crispy Chicken Bites",
    "description": "Crispy, juicy chicken tossed in a punchy house glaze and finished with fresh herbs.",
    "category": "Chicken & Wings",
    "price": 6400,
    "image": "/images/menu/chicken-wings/products/c-w7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "crispy-riot-wings",
    "slug": "crispy-riot-wings",
    "name": "Crispy Riot Wings",
    "description": "Golden crunchy wings tossed in your choice of heat.",
    "category": "Chicken & Wings",
    "price": 5600,
    "image": "/images/menu/chicken-wings/products/c-w1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "firecracker-chicken",
    "slug": "firecracker-chicken",
    "name": "Firecracker Chicken",
    "description": "Crispy, juicy chicken tossed in a punchy house glaze and finished with fresh herbs.",
    "category": "Chicken & Wings",
    "price": 7400,
    "image": "/images/menu/chicken-wings/products/c-w11.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "garlic-parm-wings",
    "slug": "garlic-parm-wings",
    "name": "Garlic Parm Wings",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 5650,
    "image": "/images/menu/chicken-wings/products/c-w4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "golden-chicken-box",
    "slug": "golden-chicken-box",
    "name": "Golden Chicken Box",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 7650,
    "image": "/images/menu/chicken-wings/products/c-w12.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "honey-pepper-tenders",
    "slug": "honey-pepper-tenders",
    "name": "Honey Pepper Tenders",
    "description": "Crispy, juicy chicken tossed in a punchy house glaze and finished with fresh herbs.",
    "category": "Chicken & Wings",
    "price": 5400,
    "image": "/images/menu/chicken-wings/products/c-w3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "lemon-pepper-wings",
    "slug": "lemon-pepper-wings",
    "name": "Lemon Pepper Wings",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 6150,
    "image": "/images/menu/chicken-wings/products/c-w6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "nashville-hot-chicken",
    "slug": "nashville-hot-chicken",
    "name": "Nashville Hot Chicken",
    "description": "Crispy, juicy chicken tossed in a punchy house glaze and finished with fresh herbs.",
    "category": "Chicken & Wings",
    "price": 5900,
    "image": "/images/menu/chicken-wings/products/c-w5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "smoky-bbq-wings",
    "slug": "smoky-bbq-wings",
    "name": "Smoky BBQ Wings",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 7150,
    "image": "/images/menu/chicken-wings/products/c-w10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "sticky-heat-wings",
    "slug": "sticky-heat-wings",
    "name": "Sticky Heat Wings",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 5150,
    "image": "/images/menu/chicken-wings/products/c-w2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "sweet-chilli-drumsticks",
    "slug": "sweet-chilli-drumsticks",
    "name": "Sweet Chilli Drumsticks",
    "description": "Golden fried chicken with a crunchy coating, tender centre and bold seasoning.",
    "category": "Chicken & Wings",
    "price": 6650,
    "image": "/images/menu/chicken-wings/products/c-w8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "brownie-riot",
    "slug": "brownie-riot",
    "name": "Brownie Riot",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 2400,
    "image": "/images/menu/desserts/products/d1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "caramel-pudding",
    "slug": "caramel-pudding",
    "name": "Caramel Pudding",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 3150,
    "image": "/images/menu/desserts/products/d4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "choco-chip-cookie-stack",
    "slug": "choco-chip-cookie-stack",
    "name": "Choco Chip Cookie Stack",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 2900,
    "image": "/images/menu/desserts/products/d3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "chocolate-mousse",
    "slug": "chocolate-mousse",
    "name": "Chocolate Mousse",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 4400,
    "image": "/images/menu/desserts/products/d9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "cinnamon-dough-bites",
    "slug": "cinnamon-dough-bites",
    "name": "Cinnamon Dough Bites",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 3650,
    "image": "/images/menu/desserts/products/d6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "fudge-cake-slice",
    "slug": "fudge-cake-slice",
    "name": "Fudge Cake Slice",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 3400,
    "image": "/images/menu/desserts/products/d5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "lemon-cream-tart",
    "slug": "lemon-cream-tart",
    "name": "Lemon Cream Tart",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 4150,
    "image": "/images/menu/desserts/products/d8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "new-york-cheesecake",
    "slug": "new-york-cheesecake",
    "name": "New York Cheesecake",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 2650,
    "image": "/images/menu/desserts/products/d2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "strawberry-shortcake",
    "slug": "strawberry-shortcake",
    "name": "Strawberry Shortcake",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 3900,
    "image": "/images/menu/desserts/products/d7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "vanilla-sundae",
    "slug": "vanilla-sundae",
    "name": "Vanilla Sundae",
    "description": "A sweet finish with rich flavour, a soft centre and just the right amount of indulgence.",
    "category": "Desserts",
    "price": 4650,
    "image": "/images/menu/desserts/products/d10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "berry-fizz",
    "slug": "berry-fizz",
    "name": "Berry Fizz",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 1900,
    "image": "/images/menu/drinks/products/d-5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "citrus-spark",
    "slug": "citrus-spark",
    "name": "Citrus Spark",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 1150,
    "image": "/images/menu/drinks/products/d-2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "fresh-lemonade",
    "slug": "fresh-lemonade",
    "name": "Fresh Lemonade",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 1400,
    "image": "/images/menu/drinks/products/d-3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "ginger-lime-pop",
    "slug": "ginger-lime-pop",
    "name": "Ginger Lime Pop",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 2400,
    "image": "/images/menu/drinks/products/d-7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "iced-tea",
    "slug": "iced-tea",
    "name": "Iced Tea",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 2150,
    "image": "/images/menu/drinks/products/d-6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "mango-cooler",
    "slug": "mango-cooler",
    "name": "Mango Cooler",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 1650,
    "image": "/images/menu/drinks/products/d-4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "orange-splash",
    "slug": "orange-splash",
    "name": "Orange Splash",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 2650,
    "image": "/images/menu/drinks/products/d-8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "riot-cola",
    "slug": "riot-cola",
    "name": "Riot Cola",
    "description": "Cold, fizzy and ready to cut through all that flavour.",
    "category": "Drinks",
    "price": 1200,
    "image": "/images/menu/drinks/products/d-1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "sparkling-water",
    "slug": "sparkling-water",
    "name": "Sparkling Water",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 3150,
    "image": "/images/menu/drinks/products/d-10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "still-water",
    "slug": "still-water",
    "name": "Still Water",
    "description": "An ice-cold refreshment served chilled and ready to pair with your meal.",
    "category": "Drinks",
    "price": 2900,
    "image": "/images/menu/drinks/products/d-9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "banana-toffee-shake",
    "slug": "banana-toffee-shake",
    "name": "Banana Toffee Shake",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 4300,
    "image": "/images/menu/milkshakes/products/m7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "chocolate-riot-shake",
    "slug": "chocolate-riot-shake",
    "name": "Chocolate Riot Shake",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 2800,
    "image": "/images/menu/milkshakes/products/m1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "cookies-and-cream",
    "slug": "cookies-and-cream",
    "name": "Cookies & Cream",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 3550,
    "image": "/images/menu/milkshakes/products/m4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "double-chocolate-malt",
    "slug": "double-chocolate-malt",
    "name": "Double Chocolate Malt",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 4550,
    "image": "/images/menu/milkshakes/products/m8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "mango-cream-shake",
    "slug": "mango-cream-shake",
    "name": "Mango Cream Shake",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 4050,
    "image": "/images/menu/milkshakes/products/m6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "salted-caramel-shake",
    "slug": "salted-caramel-shake",
    "name": "Salted Caramel Shake",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 3800,
    "image": "/images/menu/milkshakes/products/m5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "strawberry-swirl",
    "slug": "strawberry-swirl",
    "name": "Strawberry Swirl",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 3050,
    "image": "/images/menu/milkshakes/products/m2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "vanilla-cloud",
    "slug": "vanilla-cloud",
    "name": "Vanilla Cloud",
    "description": "A thick, creamy shake blended smooth and finished with a little extra indulgence.",
    "category": "Milkshakes",
    "price": 3300,
    "image": "/images/menu/milkshakes/products/m3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "bbq-chicken-pizza",
    "slug": "bbq-chicken-pizza",
    "name": "BBQ Chicken Pizza",
    "description": "Freshly baked with crisp edges, a soft centre and a lively mix of toppings.",
    "category": "Pizza",
    "price": 8350,
    "image": "/images/menu/pizza/products/p-4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "buffalo-chicken-pizza",
    "slug": "buffalo-chicken-pizza",
    "name": "Buffalo Chicken Pizza",
    "description": "Freshly baked with crisp edges, a soft centre and a lively mix of toppings.",
    "category": "Pizza",
    "price": 9850,
    "image": "/images/menu/pizza/products/p-10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "four-cheese-riot",
    "slug": "four-cheese-riot",
    "name": "Four Cheese Riot",
    "description": "A hand-stretched base with rich tomato, bubbling cheese and a generous topping finish.",
    "category": "Pizza",
    "price": 8100,
    "image": "/images/menu/pizza/products/p-3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "garden-party-pizza",
    "slug": "garden-party-pizza",
    "name": "Garden Party Pizza",
    "description": "Freshly baked with crisp edges, a soft centre and a lively mix of toppings.",
    "category": "Pizza",
    "price": 7850,
    "image": "/images/menu/pizza/products/p-2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "hot-honey-pizza",
    "slug": "hot-honey-pizza",
    "name": "Hot Honey Pizza",
    "description": "A hand-stretched base with rich tomato, bubbling cheese and a generous topping finish.",
    "category": "Pizza",
    "price": 8600,
    "image": "/images/menu/pizza/products/p-5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "margherita-social",
    "slug": "margherita-social",
    "name": "Margherita Social",
    "description": "Freshly baked with crisp edges, a soft centre and a lively mix of toppings.",
    "category": "Pizza",
    "price": 9350,
    "image": "/images/menu/pizza/products/p-8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "mushroom-melt-pizza",
    "slug": "mushroom-melt-pizza",
    "name": "Mushroom Melt Pizza",
    "description": "A hand-stretched base with rich tomato, bubbling cheese and a generous topping finish.",
    "category": "Pizza",
    "price": 9100,
    "image": "/images/menu/pizza/products/p-7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "pepperoni-riot",
    "slug": "pepperoni-riot",
    "name": "Pepperoni Riot",
    "description": "Loaded pepperoni, mozzarella and house tomato sauce.",
    "category": "Pizza",
    "price": 8200,
    "image": "/images/menu/pizza/products/p-1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "smoky-beef-pizza",
    "slug": "smoky-beef-pizza",
    "name": "Smoky Beef Pizza",
    "description": "Freshly baked with crisp edges, a soft centre and a lively mix of toppings.",
    "category": "Pizza",
    "price": 8850,
    "image": "/images/menu/pizza/products/p-6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "the-big-slice",
    "slug": "the-big-slice",
    "name": "The Big Slice",
    "description": "A hand-stretched base with rich tomato, bubbling cheese and a generous topping finish.",
    "category": "Pizza",
    "price": 9600,
    "image": "/images/menu/pizza/products/p-9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "chilli-cheese-pops",
    "slug": "chilli-cheese-pops",
    "name": "Chilli Cheese Pops",
    "description": "A shareable side with a crunchy finish and a big-flavour house seasoning.",
    "category": "Sides & Starters",
    "price": 3700,
    "image": "/images/menu/sides-starters/products/s-7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "crispy-corn-ribs",
    "slug": "crispy-corn-ribs",
    "name": "Crispy Corn Ribs",
    "description": "A shareable side with a crunchy finish and a big-flavour house seasoning.",
    "category": "Sides & Starters",
    "price": 3200,
    "image": "/images/menu/sides-starters/products/5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "dirty-fries",
    "slug": "dirty-fries",
    "name": "Dirty Fries",
    "description": "Golden, crisp and made for dipping. The perfect partner to your main.",
    "category": "Sides & Starters",
    "price": 2450,
    "image": "/images/menu/sides-starters/products/2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "garlic-bread-knots",
    "slug": "garlic-bread-knots",
    "name": "Garlic Bread Knots",
    "description": "Golden, crisp and made for dipping. The perfect partner to your main.",
    "category": "Sides & Starters",
    "price": 3950,
    "image": "/images/menu/sides-starters/products/s-8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "loaded-riot-fries",
    "slug": "loaded-riot-fries",
    "name": "Loaded Riot Fries",
    "description": "Crispy fries, cheese sauce, spring onion and riot dust.",
    "category": "Sides & Starters",
    "price": 3200,
    "image": "/images/menu/sides-starters/products/1.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "mac-and-cheese-bites",
    "slug": "mac-and-cheese-bites",
    "name": "Mac & Cheese Bites",
    "description": "Golden, crisp and made for dipping. The perfect partner to your main.",
    "category": "Sides & Starters",
    "price": 3450,
    "image": "/images/menu/sides-starters/products/6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "mozzarella-sticks",
    "slug": "mozzarella-sticks",
    "name": "Mozzarella Sticks",
    "description": "Golden, crisp and made for dipping. The perfect partner to your main.",
    "category": "Sides & Starters",
    "price": 2950,
    "image": "/images/menu/sides-starters/products/4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "onion-ring-rumble",
    "slug": "onion-ring-rumble",
    "name": "Onion Ring Rumble",
    "description": "A shareable side with a crunchy finish and a big-flavour house seasoning.",
    "category": "Sides & Starters",
    "price": 2700,
    "image": "/images/menu/sides-starters/products/3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "seasoned-wedges",
    "slug": "seasoned-wedges",
    "name": "Seasoned Wedges",
    "description": "Golden, crisp and made for dipping. The perfect partner to your main.",
    "category": "Sides & Starters",
    "price": 4450,
    "image": "/images/menu/sides-starters/products/s-10.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "slaw-situation",
    "slug": "slaw-situation",
    "name": "Slaw Situation",
    "description": "A shareable side with a crunchy finish and a big-flavour house seasoning.",
    "category": "Sides & Starters",
    "price": 4200,
    "image": "/images/menu/sides-starters/products/s-9.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "bbq-beef-melt",
    "slug": "bbq-beef-melt",
    "name": "BBQ Beef Melt",
    "description": "Grilled filling, fresh greens and a bright house sauce wrapped up for a satisfying bite.",
    "category": "Wraps & Sandwiches",
    "price": 4300,
    "image": "/images/menu/wraps-sandwiches/products/w3.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "buffalo-crunch-wrap",
    "slug": "buffalo-crunch-wrap",
    "name": "Buffalo Crunch Wrap",
    "description": "Toasted bread, generous filling and crisp fresh ingredients in every mouthful.",
    "category": "Wraps & Sandwiches",
    "price": 4050,
    "image": "/images/menu/wraps-sandwiches/products/w2.jpg",
    "featured": true,
    "available": true
  },
  {
    "id": "chicken-club-stack",
    "slug": "chicken-club-stack",
    "name": "Chicken Club Stack",
    "description": "Grilled filling, fresh greens and a bright house sauce wrapped up for a satisfying bite.",
    "category": "Wraps & Sandwiches",
    "price": 5300,
    "image": "/images/menu/wraps-sandwiches/products/w7.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "crispy-caesar-wrap",
    "slug": "crispy-caesar-wrap",
    "name": "Crispy Caesar Wrap",
    "description": "Grilled filling, fresh greens and a bright house sauce wrapped up for a satisfying bite.",
    "category": "Wraps & Sandwiches",
    "price": 4800,
    "image": "/images/menu/wraps-sandwiches/products/w5.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "grilled-garden-wrap",
    "slug": "grilled-garden-wrap",
    "name": "Grilled Garden Wrap",
    "description": "Toasted bread, generous filling and crisp fresh ingredients in every mouthful.",
    "category": "Wraps & Sandwiches",
    "price": 4550,
    "image": "/images/menu/wraps-sandwiches/products/w4.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "pepper-steak-sub",
    "slug": "pepper-steak-sub",
    "name": "Pepper Steak Sub",
    "description": "Toasted bread, generous filling and crisp fresh ingredients in every mouthful.",
    "category": "Wraps & Sandwiches",
    "price": 5050,
    "image": "/images/menu/wraps-sandwiches/products/w6.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "spicy-slaw-wrap",
    "slug": "spicy-slaw-wrap",
    "name": "Spicy Slaw Wrap",
    "description": "Toasted bread, generous filling and crisp fresh ingredients in every mouthful.",
    "category": "Wraps & Sandwiches",
    "price": 5550,
    "image": "/images/menu/wraps-sandwiches/products/w8.jpg",
    "featured": false,
    "available": true
  },
  {
    "id": "street-chicken-wrap",
    "slug": "street-chicken-wrap",
    "name": "Street Chicken Wrap",
    "description": "Grilled filling, fresh greens and a bright house sauce wrapped up for a satisfying bite.",
    "category": "Wraps & Sandwiches",
    "price": 3800,
    "image": "/images/menu/wraps-sandwiches/products/w1.jpg",
    "featured": true,
    "available": true
  }
];
