import harira from "@/assets/images/hero/hero-harira.jpg";
import couscous from "@/assets/images/hero/hero-couscous.jpg";
import tagine from "@/assets/images/hero/hero-tagine.jpg";
import pastilla from "@/assets/images/hero/hero-pastilla.jpg";

export const RECIPES = [
  {
    id: "harira",
    slug: "harira",
    title: "Harira",
    category: "Soups",
    description:
      "The rich tomato, lentil and chickpea soup that breaks the fast at sunset.",
    prepTime: "1 h 30",
    difficulty: "Medium",
    image: harira,
    alt: "A bowl of harira soup with chickpeas and fresh coriander",
  },
  {
    id: "couscous",
    slug: "seven-vegetable-couscous",
    title: "Seven-Vegetable Couscous",
    category: "Couscous",
    description:
      "Friday's family dish: steamed semolina crowned with seven vegetables.",
    prepTime: "2 h",
    difficulty: "Medium",
    image: couscous,
    alt: "Couscous topped with seven vegetables",
  },
  {
    id: "tagine",
    slug: "tagine-with-prunes",
    title: "Tagine with Prunes",
    category: "Tagines",
    description:
      "Slow-cooked meat with sweet prunes, cinnamon and toasted almonds.",
    prepTime: "2 h 30",
    difficulty: "Medium",
    image: tagine,
    alt: "Tagine with prunes and toasted almonds in a clay pot",
  },
  {
    id: "pastilla",
    slug: "chicken-pastilla",
    title: "Chicken Pastilla",
    category: "Pastilla",
    description:
      "Crisp layers of warqa filled with spiced chicken, almonds and cinnamon sugar.",
    prepTime: "3 h",
    difficulty: "Advanced",
    image: pastilla,
    alt: "Pastilla dusted with powdered sugar and cinnamon",
  },
];