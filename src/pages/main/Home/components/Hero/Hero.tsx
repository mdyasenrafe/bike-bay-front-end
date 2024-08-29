import { Col, Row } from "antd";
import React from "react";
import Photo from "../../../../../assets/images/hero_section.png";
import { Button, Container, Text } from "../../../../../components/atoms";
import { FormInput, FormWrapper } from "../../../../../components/form";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TFormData = {
  keyword: string;
};

export const Hero = () => {
  const handleSearch: SubmitHandler<TFormData> = async (data) => {
    console.log(data);
  };
  return (
    <section className="py-10">
      <Container>
        <Row align="middle">
          <Col md={12}>
            <Text
              variant="H1"
              className="text-4xl md:text-[48px] lg:text-[64px] leading-[3.50rem] md:leading-[3.50rem] lg:leading-[4.75rem]"
            >
              Start your Ride <br />
              With <span className="text-primary">BikeBay</span>
            </Text>
            <Text variant="P3" className="w-[80%] mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quas nulla commodi necessitatibus, perferendis delectus quaerat
              assumenda et itaque corrupti?
            </Text>

            <FormWrapper onSubmit={handleSearch}>
              <div className="border border-[#e1e1e1] h-[48px] rounded-lg flex items-center justify-between mt-6 lg:w-[80%]">
                <FormInput
                  name="keyword"
                  type="text"
                  style={{ marginBottom: 0, width: "85%" }}
                  inputStyle={{ borderWidth: 0 }}
                />
                <Button
                  color="primary"
                  htmlType="submit"
                  className="w-[88px] h-[38px] text-[14px] text-white mr-3"
                >
                  Submit
                </Button>
              </div>
            </FormWrapper>
          </Col>
          <Col md={12}>
            <img src={Photo} className=" h-full" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
