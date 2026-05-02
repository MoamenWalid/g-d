export const CATALOG_CATEGORIES = [
  { id: "perfumes", label: "العطور الفاخرة" },
  { id: "skincare", label: "العناية والبشرة" },
  { id: "wellness", label: "العافية والاسترخاء" },
  { id: "gifts", label: "الهدايا والتغليف" },
  { id: "accessories", label: "الإكسسوارات" },
] as const;

export type CatalogCategoryId = (typeof CATALOG_CATEGORIES)[number]["id"];

export type CatalogProduct = {
  id: string;
  title: string;
  categoryId: CatalogCategoryId;
  categoryLabel: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  inStock: boolean;
  image: string;
  /** Higher = more recommended (stable default sort) */
  recommendationRank: number;
};

const IMAGES = [
  "photo-1608571423902-eed4a5ad8108",
  "photo-1594035910387-fea47794261f",
  "photo-1585386959984-a4155224a1ad",
  "photo-1587017539504-67cfbddac569",
  "photo-1590156562745-5a5c3a8bda50",
  "photo-1526045612212-70caf35c14df",
  "photo-1563170351-be82bc888aa4",
  "photo-1600612253971-183bb33d78f7",
  "photo-1548036328-c9fa89d128fa",
  "photo-1523275335684-37898b6baf30",
  "photo-1611591437281-460bfbe1220a",
  "photo-1612817288484-6f916006741a",
  "photo-1505740420928-5e560c06d30e",
  "photo-1522335789203-aabd1fc54bc9",
  "photo-1491553895911-0055eca6402d",
  "photo-1511707171634-5f897ff02aa9",
  "photo-1526170375885-4d8ecf77b99f",
  "photo-1572635196237-14b3f281503f",
  "photo-1434389677669-e08b4cac3105",
  "photo-1556228720-195a672e8a03",
];

function img(photo: string, w: number) {
  return `https://images.unsplash.com/${photo}?fit=crop&w=${w}&q=82`;
}

const TITLE_PREFIX = [
  "مجموعة",
  "عطر",
  "مستحضر",
  "سيروم",
  "زيت عطري",
  "باقة",
  "علبة هدايا",
  "ماء عطر",
  "كريم",
  "بخاخ",
];

const TITLE_SUFFIX = [
  "الذهبي",
  "الليلي",
  "الملكي",
  "الفاخر",
  "الكلاسيكي",
  "المميز",
  "الراقي",
  "الشرقي",
  "النعوم",
  "الحديث",
];

/** 50 catalog items — deterministic for SSR/testing */
export const CATALOG_PRODUCTS: CatalogProduct[] = Array.from(
  { length: 50 },
  (_, i) => {
    const cat = CATALOG_CATEGORIES[i % CATALOG_CATEGORIES.length];
    const base = 89 + (i % 17) * 37 + (i % 5) * 12;
    const hasSale = i % 3 !== 0;
    const compareAt = hasSale ? Math.round(base * (1.12 + (i % 7) * 0.03)) : null;
    const inStock = i % 7 !== 5;
    const rating = Math.round((3.8 + (i % 13) * 0.15 + (i % 3) * 0.1) * 10) / 10;
    const title = `${TITLE_PREFIX[i % TITLE_PREFIX.length]} ${TITLE_SUFFIX[(i * 3) % TITLE_SUFFIX.length]} — ${i + 1}`;

    return {
      id: `catalog-${String(i + 1).padStart(3, "0")}`,
      title,
      categoryId: cat.id,
      categoryLabel: cat.label,
      price: base,
      compareAtPrice: compareAt,
      rating: Math.min(5, rating),
      inStock,
      image: img(IMAGES[i % IMAGES.length], 640),
      recommendationRank: 1000 - i * 7 + (i % 4) * 3,
    };
  },
);

export function catalogPriceBounds(products: CatalogProduct[]) {
  let min = Infinity;
  let max = 0;
  for (const p of products) {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }
  if (!Number.isFinite(min)) return { min: 0, max: 1000 };
  return { min, max };
}
