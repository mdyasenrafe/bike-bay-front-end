import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { Button, Container, Text } from "../../../components/atoms";
import { FormInput, FormWrapper } from "../../../components/form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { signupSchema } from "../../../Schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Signup = () => {
  const onSubmit: SubmitHandler<any> = async (data) => {};
  return (
    <MainLayout>
      <Container>
        <div className="flex items-center justify-center min-h-screen ">
          <div className="border border-[#e1e1e1] p-6 rounded-lg w-full max-w-lg">
            <div className="justify-center ">
              <Text variant="H2">Signup</Text>
              <Text variant="P3" className="text-gray-400 my-4">
                Please fill in the details below to create your account. With an
                account, you’ll be able to enjoy faster booking, track your
                rentals, and much more!
              </Text>
            </div>
            <FormWrapper
              onSubmit={onSubmit}
              resolver={zodResolver(signupSchema)}
            >
              <FormInput name="fullName" label="Full Name" />
              <FormInput name="email" label="Email" />
              <FormInput name="phone" label="Phone" />
              <FormInput name="address" label="Address" />
              <FormInput name="password" label="Password" />
              <Button
                color="primary"
                htmlType="submit"
                className="w-full h-[48px] text-[18px] text-white"
              >
                Submit
              </Button>
            </FormWrapper>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
