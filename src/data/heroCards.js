import msemen from "@/assets/images/hero/hero-msemen.jpg";
import pastilla from "@/assets/images/hero/hero-pastilla.jpg";
import chicken from "@/assets/images/hero/hero-chicken.jpg";
import tagine from "@/assets/images/hero/hero-tagine.jpg";
import pastries from "@/assets/images/hero/hero-pastries.jpg";
import couscous from "@/assets/images/hero/hero-couscous.jpg";
import rfissa from "@/assets/images/recipes/rfissa.jpg";
import harira from "@/assets/images/hero/hero-harira.jpg";
import chebakia from "@/assets/images/hero/hero-chebakia.jpg";

// Cards travel left → right along the hero arc, in this order.
// Each slug must match a slug in src/data/recipes.js exactly.
export const HERO_CARDS = [
  {
    id: "msemen",
    title: "Msemen & Amlou",
    slug: "msemen",
    image: msemen,
    alt: "Golden square msemen flatbreads served with honey and almonds",
  },
  {
    id: "chebakia",
    title: "Chebakia",
    slug: "chebakia",
    image: chebakia,
    alt: "Flower-shaped chebakia cookies coated in honey and sesame seeds",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    slug: "chicken-pastilla",
    image: pastilla,
    alt: "Pastilla dusted with powdered sugar and cinnamon",
  },
  {
    id: "chicken",
    title: "Chicken & Olives",
    slug: "chicken-tagine-preserved-lemon-olives",
    image: chicken,
    alt: "Moroccan chicken with green olives and fresh herbs",
  },
  {
    id: "tagine",
    title: "Tagine with Prunes",
    slug: "tagine-with-prunes",
    image: tagine,
    alt: "Tagine with prunes and toasted almonds in a clay pot",
  },
  {
    id: "pastries",
    title: "Kaab el Ghazal",
    slug: "kaab-el-ghazal",
    image: pastries,
    alt: "Crescent-shaped kaab el ghazal almond pastries",
  },
  {
    id: "couscous",
    title: "Couscous",
    slug: "seven-vegetable-couscous",
    image: couscous,
    alt: "Couscous topped with seven vegetables",
  },
  {
    id: "rfissa",
    title: "Rfissa",
    slug: "rfissa",
    image: rfissa,
    alt: "Rfissa: shredded msemen with chicken, lentils and fenugreek broth",
  },
  {
    id: "harira",
    title: "Harira",
    slug: "harira",
    image: harira,
    alt: "A bowl of harira soup with chickpeas and fresh coriander",
  },
];