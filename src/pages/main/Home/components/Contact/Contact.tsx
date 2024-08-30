import React from "react";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ContactImage from "../../../../../assets/images/contactUs.png";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Fade } from "react-awesome-reveal";
import { Button, Container, Text } from "../../../../../components/atoms";
import { Colors } from "../../../../../theme";
import {
  FormInput,
  FormTextArea,
  FormWrapper,
} from "../../../../../components/form";
import { contactSchema } from "../../../../../Schema";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  body: string;
};

export const Contact = () => {
  const onSubmit: SubmitHandler<any> = async (data: ContactFormData) => {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.body,
      };
      await emailjs.send(
        "service_ebr0xyp",
        "template_6huktzp",
        templateParams,
        "user_FFOGulXlY1DTTgXihYTZS"
      );
      toast.success(
        "Thank you for reaching out! Your message has been sent successfully."
      );
    } catch (error) {
      toast.error(
        "Sorry, there was an error sending your message. Please try again later."
      );
    }
  };
  return (
    <section className="py-24">
      <Container>
        <Row>
          <Col md={12}>
            <Fade cascade duration={2500} triggerOnce={true}>
              <img src={ContactImage} className=" h-full" />
            </Fade>
          </Col>

          <Col md={12}>
            <Fade cascade duration={2500} triggerOnce={true}>
              <div className="mb-4">
                <Text variant={"H1"}>Get in Touch</Text>
                <Text
                  variant={"P3"}
                  className="mt-[8px]"
                  style={{ color: Colors.darkGray }}
                >
                  Have a question or suggestion? Drop us a line – we're here to
                  help!
                </Text>
              </div>

              <FormWrapper
                onSubmit={onSubmit}
                resolver={zodResolver(contactSchema)}
              >
                <FormInput label="Name" type="text" name="name" />
                <FormInput label="Email" type="email" name="email" />
                <FormInput label="Subject" type="text" name="subject" />
                <FormTextArea label="Body" name="body" />
                <Button
                  color="primary"
                  htmlType="submit"
                  className="w-full h-[48px] text-[18px] text-white"
                >
                  Submit
                </Button>
              </FormWrapper>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
