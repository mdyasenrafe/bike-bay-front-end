import React from "react";
import { TTestimonial } from "../../../constant";
import { Text } from "../Text";
import { Row } from "antd";

interface TestimonialCardProps {
  testimonial: TTestimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-16 h-16 rounded-full mx-auto"
      />
      <Text variant="H3" className="text-center mt-4 dark:!text-black">
        {testimonial.name}
      </Text>
      <Text variant="P4" className="text-center text-gray-600 dark:!text-black">
        {testimonial.role}
      </Text>
      <Row className="mt-4" justify={"center"}>
        <Text className="text-yellow-400 dark:!text-yellow-400">
          {"★".repeat(testimonial.rating)}
          {"☆".repeat(5 - testimonial.rating)}
        </Text>
      </Row>
      <Text variant="P4" className="text-gray-700 mt-4 dark:!text-black">
        {testimonial.review}
      </Text>
    </div>
  );
};
