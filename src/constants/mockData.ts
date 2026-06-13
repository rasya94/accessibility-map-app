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
];

export const facilityLabels: Record<FacilityKey, string> = {
  wheelchair: "Wheelchair Accessible",
  air: "Air Conditioner",
  lift: "Lift",
  toilet: "Toilet Difabel",
  escalator: "Eskalator",
  parking: "Parkir Khusus",
};
