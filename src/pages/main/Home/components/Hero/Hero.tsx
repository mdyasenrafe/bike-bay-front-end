import { Col, Row } from "antd";
import React from "react";
import Photo from "../../../../../assets/images/hero_section.png";
import { Container, Text } from "../../../../../components/atoms";

export const Hero = () => {
  return (
    <section>
      <Container>
        <Row align="middle">
          <Col md={12}>
            <Text
              variant="H1"
              className="text-4xl md:text-[48px] lg:text-[64px] leading-[2.75rem] sm:leading-[2.75rem] md:leading-[3.50rem] lg:leading-[4.75rem]"
            >
              Start your Ride <br />
              With <span className="text-primary">BikeBay</span>
            </Text>
            <Text variant="P3" className="w-[80%] mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quas nulla commodi necessitatibus, perferendis delectus quaerat
              assumenda et itaque corrupti?
            </Text>
          </Col>
          <Col md={12}>
            <img src={Photo} className=" h-full" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
