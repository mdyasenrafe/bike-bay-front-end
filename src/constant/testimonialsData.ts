export type TTestimonial = {
  name: string;
  image: string;
  rating: number;
  review: string;
  role: string;
};

export const TestimonialsData: TTestimonial[] = [
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    review:
      "Amazing service! The bike was in great condition and the rental process was seamless.",
    role: "Customer",
  },
  {
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    review:
      "I had a wonderful experience renting a bike here. Highly recommended!",
    role: "Customer",
  },
  {
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 4,
    review: "Good service, but the bike could have been cleaner.",
    role: "Customer",
  },
  {
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    review: "The best bike rental in town! Will definitely come back.",
    role: "Customer",
  },
  {
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    review:
      "Great prices and friendly staff. I had a good time riding around the town.",
    role: "Customer",
  },
  {
    name: "Sophia Wilson",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    review:
      "Excellent experience! The online booking system is very user-friendly.",
    role: "Customer",
  },
  {
    name: "Liam Miller",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    rating: 4,
    review: "The bike was decent, but the return process could be faster.",
    role: "Customer",
  },
  {
    name: "Olivia Anderson",
    image: "https://randomuser.me/api/portraits/women/81.jpg",
    rating: 5,
    review:
      "The bike rental service was fantastic! The staff were very helpful.",
    role: "Customer",
  },
  {
    name: "Noah Martinez",
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    rating: 5,
    review: "Top-notch service and quality bikes. Highly recommended!",
    role: "Customer",
  },
  {
    name: "Isabella Taylor",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 5,
    review: "Great experience! The bike was perfect for exploring the area.",
    role: "Customer",
  },
];
