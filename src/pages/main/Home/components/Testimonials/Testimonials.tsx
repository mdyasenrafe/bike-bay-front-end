import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import { TestimonialsData } from "../../../../../constant";
import {
  Container,
  TestimonialCard,
  Text,
} from "../../../../../components/atoms";

export const Testimonials = () => {
  return (
    <section className="py-32 testimonial-section">
      <Container>
        <div className="div">
          <Text variant="H1" className="text-center mb-4 text-white">
            Our Reviews
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-white pb-16"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
            ullam eaque odio illo unde quasi culpa deleniti natus sequi! Ipsa!
          </Text>
        </div>
      </Container>
      <Container>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {TestimonialsData.map((testimonal, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};
