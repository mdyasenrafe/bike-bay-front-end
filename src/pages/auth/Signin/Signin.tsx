import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { Button, Container, Text } from "../../../components/atoms";
import { FormInput, FormWrapper } from "../../../components/form";
import { SubmitHandler } from "react-hook-form";
import { signinSchema } from "../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TSigninValue,
  addUser,
  useLoginMutation,
} from "../../../redux/features/auth";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux";

export const Signin = () => {
  //  hooks
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<TSigninValue> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(addUser({ user: res.data, token: res.token as string }));
      toast.success(res?.message);
      const redirectUrl = location.state?.from?.pathname || "/";
      navigate(redirectUrl);
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
              <Text variant="H2">Sign In to Your Account</Text>
              <Text variant="P3" className="text-gray-400 my-4">
                Please enter your email and password to sign in to your account.
                If you don't have an account yet, you can easily create one.
              </Text>
            </div>
            <FormWrapper
              onSubmit={onSubmit}
              resolver={zodResolver(signinSchema)}
            >
              <FormInput
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
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
                Sign in
              </Button>
            </FormWrapper>
            <div className="mt-4 text-center">
              <Text variant="P3" className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 underline">
                  Create one here
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
