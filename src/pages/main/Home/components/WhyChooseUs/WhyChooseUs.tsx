import React from "react";
import { Container, Text } from "../../../../../components/atoms";
import { Col, Row } from "antd";
import CountUp from "react-countup";
import { benefits, stats } from "../../../../../constant";
import ChooseUs from "../../../../../assets/images/whyChoose.png";

export const WhyChooseUs = () => {
  return (
    <Container>
      <section className="py-32 ">
        <Row gutter={32} align="middle">
          <Col xs={24} lg={12}>
            <img src={ChooseUs} alt="Bikes" className="w-full h-full" />
          </Col>
          <Col xs={24} lg={12}>
            <Text variant="H1" className="mb-4">
              Why Choose BikeBay?
            </Text>
            <Text variant="P4" className="text-gray-500 mb-6 leading-6">
              At BikeBay, we are dedicated to providing the best bike rental
              experience with a wide range of well-maintained bikes and
              scooters. Whether you're exploring the city or commuting to work,
              we have the perfect vehicle for you.
            </Text>
            <ul className="list-none space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <Text variant="P2" className="text-gray-700">
                    {benefit.text}
                  </Text>
                </li>
              ))}
            </ul>
            <hr />
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <span
                    className={`text-2xl lg:text-4xl font-bold ${stat.color}`}
                  >
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={3}
                    />
                  </span>

                  <Text variant="P4" className="text-gray-500">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};
