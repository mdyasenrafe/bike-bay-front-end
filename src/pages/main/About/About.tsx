import React from "react";
import { Col, Row } from "antd";
import { Contact } from "../Home/components";
import { FaUser } from "react-icons/fa";
import { MainLayout } from "../../../components/layouts";
import { Container, Text } from "../../../components/atoms";

export const About = () => {
  const teamMembers = [
    { name: "John Doe", position: "CEO", icon: <FaUser size={50} /> },
    { name: "Jane Smith", position: "CTO", icon: <FaUser size={50} /> },
    { name: "Alice Johnson", position: "CFO", icon: <FaUser size={50} /> },
    { name: "Bob Brown", position: "CMO", icon: <FaUser size={50} /> },
  ];

  return (
    <MainLayout>
      <Container>
        <section className="pb-10">
          <Row align={"middle"}>
            <Col xs={24} lg={12}>
              <img src="https://i.ibb.co/B3j4G0Q/About-us-page-bro.png" />
            </Col>
            <Col xs={24} lg={12}>
              <Text variant={"H1"} className="mb-6">
                About BikeBay
              </Text>
              <Text variant={"P2"} className="mb-4">
                BikeBay is transforming the way people experience bike rentals
                by making the process simpler, faster, and more convenient than
                ever before. Whether you're commuting to work, exploring a new
                city, or embarking on a weekend adventure, BikeBay provides a
                diverse range of high-quality bikes to meet your needs. Our
                platform offers a seamless booking experience, backed by
                reliable customer support, ensuring that every ride is enjoyable
                and hassle-free. At BikeBay, we’re not just about convenience —
                we’re about sustainability. Biking is one of the most
                eco-friendly modes of transport, and by encouraging more people
                to choose bikes over cars, we contribute to a greener planet.
                Our platform fosters an environmentally conscious community by
                reducing carbon emissions and promoting healthier living. Every
                bike rented through BikeBay plays a small part in reducing
                traffic congestion and pollution in urban areas. Beyond
                environmental benefits, BikeBay also supports local economies.
                We partner with independent bike shops and owners, allowing them
                to list their bikes on our platform. This collaborative approach
                ensures that riders have access to a wide variety of bikes,
                while local businesses thrive. Whether you’re a casual rider or
                a bike enthusiast, BikeBay offers a unique, sustainable, and
                community-driven rental experience.
              </Text>
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={12}>
              <img src="https://i.ibb.co/PQMz9WR/Business-mission-pana.png" />
            </Col>
            <Col xs={24} lg={12}>
              <Text variant={"H3"} className="mt-8 mb-4">
                Our Mission & Vision
              </Text>
              <Text variant={"P2"} className="mb-4">
                Our mission at BikeBay is to promote sustainable urban mobility
                by making bike rentals easily accessible, affordable, and
                convenient for everyone. We believe that biking should be a key
                part of everyday life — a fun, healthy, and eco-friendly way to
                get around. Our goal is to reduce the reliance on cars and other
                polluting forms of transportation by providing a simple,
                user-friendly platform where anyone can rent a bike with just a
                few clicks.
              </Text>
              <Text variant={"P2"} className="mb-4">
                BikeBay envisions a world where biking is the go-to choice for
                urban mobility. We aspire to become the leading bike rental
                platform globally, offering innovative and eco-friendly
                solutions to city travelers, tourists, and outdoor enthusiasts.
                Our vision is to create a future where biking is integrated
                seamlessly into everyday life, providing a healthy, efficient,
                and sustainable way to get around.
              </Text>
            </Col>
          </Row>
          <Contact />
          <div className="mt-10">
            <Text variant={"H2"} className="text-center mb-4">
              Meet Our Team
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto gap-6 my-12 px-10 w-full ">
              {teamMembers?.map((data, index) => (
                <div
                  className="md:flex items-center justify-center mx-auto bg-gray-200 border-x border-[#E1E1E1] p-8 rounded-[32px] shadow h-full mt-4 w-full"
                  key={index}
                >
                  <div>{data.icon}</div>
                  <div className="mt-4 sm:mt-4 md:mt-0">
                    <p className="text-[#161616] ml-4 text-[20px] font-bold">
                      {data?.name}
                    </p>
                    <p className="text-[#161616] ml-4 text-[14px]">
                      {data?.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </MainLayout>
  );
};
