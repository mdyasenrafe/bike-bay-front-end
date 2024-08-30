import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import { TestimonialsData } from "../../../../../constant";
import {
  Container,
  TestimonialCard,
  Text,
} from "../../../../../components/atoms";

export const Testimonials = () => {
  return (
    <section className="py-40 testimonial-section">
      <Container>
        <div className="div">
          <Text variant="H1" className="text-center mb-4 text-white">
            Hear What Our Riders Have to Say!
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-white pb-16"
          >
            Our bike rental service is revolutionizing the way people explore
            their surroundings. Don't just take our word for it, see what our
            satisfied customers have to say!
          </Text>
        </div>
      </Container>
      <Container>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
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
          className="slider"
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
        >
          {TestimonialsData.map((testimonal, index) => (
            <SwiperSlide key={index} className="h-full">
              <TestimonialCard testimonial={testimonal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};
