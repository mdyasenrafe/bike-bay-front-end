import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { Button, Container, Text } from "../../../components/atoms";
import { FormInput, FormWrapper } from "../../../components/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema } from "../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  TSignupValue,
  addUser,
  useSignupMutation,
} from "../../../redux/features/auth";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux";

export const Signup = () => {
  // hooks
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignupValue> = async (data) => {
    try {
      data["role"] = "user";
      const res = await signup(data).unwrap();
      dispatch(addUser({ user: res.data, token: res.token as string }));
      toast.success(res?.message);
      navigate("/profile");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <MainLayout>
      <Container>
        <div className="flex items-center justify-center min-h-screen ">
          <div className="border border-[#e1e1e1] p-6 rounded-lg w-full max-w-lg">
            <div className="justify-center ">
              <Text variant="H2">Create an Account</Text>
              <Text variant="P3" className="text-gray-400 my-4">
                Fill out the form below to create your account. By signing up,
                you'll benefit from faster booking, tracking your rentals, and
                more!
              </Text>
            </div>
            <FormWrapper
              onSubmit={onSubmit}
              resolver={zodResolver(signupSchema)}
            >
              <FormInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
              />
              <FormInput
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
              />
              <FormInput
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <FormInput
                name="address"
                label="Address"
                placeholder="Enter your address"
              />
              <FormInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button
                color="primary"
                htmlType="submit"
                className="w-full h-[48px] text-[18px] text-white"
                loading={isLoading}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </FormWrapper>
            <div className="mt-4 text-center">
              <Text variant="P3" className="text-gray-500">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-500 underline">
                  Log in here
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
