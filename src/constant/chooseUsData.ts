type Benefit = {
  text: string;
};

type Stat = {
  value: number;
  label: string;
  color: string;
  suffix: string;
};

export const benefits: Benefit[] = [
  { text: "Wide selection of bikes and scooters for every need" },
  { text: "Easy online booking and flexible rental plans" },
  { text: "Well-maintained vehicles for a safe and comfortable ride" },
];

export const stats: Stat[] = [
  {
    value: 500,
    label: "Bikes Available",
    color: "text-orange-600",
    suffix: "+",
  },
  {
    value: 3000,
    label: "Happy Customers",
    color: "text-green-600",
    suffix: "K+",
  },
  {
    value: 5000,
    label: "Successful Rentals",
    color: "text-blue-600",
    suffix: "K",
  },
];
