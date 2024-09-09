import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../../components/atoms";
import { MainLayout } from "../../components/layouts";

export const NotFound = () => {
  return (
    <MainLayout>
      <Container>
        <img
          className="w-full lg:h-2/4 object-contain"
          src="https://i.ibb.co.com/CHqL1f6/404-page.gif"
          alt=""
        />
        <div className="text-center">
          <Link to="/">
            <Button className="mb-7 w-[238px] text-white" color="primary">
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
};
