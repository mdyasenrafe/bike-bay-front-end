import { Col, Row } from "antd";
import React from "react";
import HeroImage from "../../../../../assets/images/hero_section.png";
import { Button, Container, Text } from "../../../../../components/atoms";
import { FormInput, FormWrapper } from "../../../../../components/form";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../redux";
import { getDarkMode } from "../../../../../redux/features/theme";
import { Fade } from "react-awesome-reveal";

type SearchFormData = {
  searchQuery: string;
};

export const Hero = () => {
  const darkMode = useAppSelector(getDarkMode);
  const navigate = useNavigate();
  const handleSearch: SubmitHandler<SearchFormData> = async (data) => {
    navigate(`/bikes?search=${encodeURIComponent(data.searchQuery)}`);
  };

  return (
    <section className="py-10">
      <Container>
        <Row align="middle">
          <Col md={12}>
            <Fade duration={2000} triggerOnce={true} direction="left">
              <Text
                variant="H1"
                className="text-4xl md:text-[48px] lg:text-[64px] leading-[3.50rem] md:leading-[3.50rem] lg:leading-[4.75rem]"
              >
                Explore the World <br />
                With <span className="text-primary">BikeBay</span>
              </Text>
              <Text variant="P3" className="w-[80%] mt-4">
                Discover new destinations on two wheels. Rent a bike anywhere in
                the world with BikeBay and start your adventure today.
              </Text>

              <FormWrapper onSubmit={handleSearch}>
                <div className="border border-[#e1e1e1] h-[48px] rounded-lg flex items-center justify-between mt-6 lg:w-[80%]">
                  <FormInput
                    name="searchQuery"
                    placeholder="Find your perfect bike..."
                    divStyle={{ marginBottom: 0, width: "85%" }}
                    style={{
                      borderWidth: 0,
                      backgroundColor: darkMode ? "black" : "white",
                      color: darkMode ? "white" : "black",
                    }}
                    type="text"
                  />
                  <Button
                    color="primary"
                    htmlType="submit"
                    className="w-[88px] h-[38px] text-[14px] text-white mr-3"
                  >
                    Search
                  </Button>
                </div>
              </FormWrapper>
            </Fade>
          </Col>

          <Col md={12}>
            <Fade duration={2000} triggerOnce={true} direction="right">
              <img
                src={HeroImage}
                className="h-full"
                alt="Bike Rental Service"
              />
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
