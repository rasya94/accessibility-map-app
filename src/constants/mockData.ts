export type FacilityKey =
  | "wheelchair"
  | "air"
  | "lift"
  | "toilet"
  | "escalator"
  | "parking";

export type Place = {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  score: number;
  image: string;
  category: "Cafe" | "Store" | "Eatery";
  facilities: FacilityKey[];
};

export const places: Place[] = [
  {
    id: "1",
    name: "Cafe Little Talk",
    address: "Jl. Road Street Path no. 3",
    rating: 4.6,
    reviews: 25,
    score: 90,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    category: "Cafe",
    facilities: ["wheelchair", "air", "lift"],
  },
  {
    id: "2",
    name: "Cafe Big Talk",
    address: "Jl. Road Street Path no. 9",
    rating: 4.4,
    reviews: 18,
    score: 76,
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
    category: "Cafe",
    facilities: ["wheelchair", "air"],
  },
  {
    id: "3",
    name: "Store Bright Day",
    address: "Jl. Market Lane no. 12",
    rating: 4.7,
    reviews: 31,
    score: 82,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    category: "Store",
    facilities: ["wheelchair", "parking"],
  },
  {
    id: "4",
    name: "Bakmie Karet Kenangan",
    address: "Jl. Raya Mulyosari No. 45",
    rating: 4.8,
    reviews: 156,
    score: 85,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1200&q=80",
    category: "Eatery",
    facilities: ["wheelchair", "air", "parking"],
  },
  {
    id: "5",
    name: "Techno Cafe ITS",
    address: "Area Kampus ITS Sukolilo",
    rating: 4.5,
    reviews: 89,
    score: 95,
    image:
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80",
    category: "Cafe",
    facilities: ["wheelchair", "parking", "toilet", "air"],
  },
  {
    id: "6",
    name: "Ayam Geprek Juara",
    address: "Jl. Keputih Perintis No. 12",
    rating: 4.3,
    reviews: 210,
    score: 70,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    category: "Eatery",
    facilities: ["air", "parking"],
  },
  {
    id: "7",
    name: "Pakuwon Supermarket",
    address: "Pakuwon Mall, Lantai Dasar",
    rating: 4.9,
    reviews: 432,
    score: 98,
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
    category: "Store",
    facilities: ["wheelchair", "lift", "escalator", "toilet", "parking"],
  },
  {
    id: "8",
    name: "Warung Sate Senayan",
    address: "Tunjungan Plaza 4, Lantai 5",
    rating: 4.7,
    reviews: 320,
    score: 88,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    category: "Eatery",
    facilities: ["wheelchair", "air", "toilet", "escalator"],
  }
];

export const facilityLabels: Record<FacilityKey, string> = {
  wheelchair: "Wheelchair Accessible",
  air: "Air Conditioner",
  lift: "Lift",
  toilet: "Toilet Difabel",
  escalator: "Eskalator",
  parking: "Parkir Khusus",
};