import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row } from "antd";
import {
  TProduct,
  useGetProductsByIdQuery,
} from "../../../redux/features/product";
import { MainLayout } from "../../../components/layouts/MainLayout";
import {
  Button,
  Container,
  LoadingSpinner,
  Text,
} from "../../../components/atoms";
import { Colors } from "../../../theme";
import { useModal } from "../../../hooks";
import { BookingModal } from "./components";

export const BikeDetail = () => {
  // hooks
  let { productId } = useParams();
  const { data: productData, isLoading } = useGetProductsByIdQuery(
    productId as string
  );

  const { openModal, isModalOpen, closeModal } = useModal();

  return (
    <MainLayout>
      <Container>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <section>
            <Row className="bg-white border border-[#E1E1E1] rounded-lg p-4">
              <Col xs={24} md={12}>
                <div className="h-[400px] md:h-[600px] flex ">
                  <img
                    src={productData?.data.thumb}
                    className="rounded-lg h-full lg:w-[90%]"
                  />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="mb-4 pt-8">
                  <Text variant={"H1"} className="mb-2">
                    {productData?.data.name}
                  </Text>

                  <Text
                    variant={"H2"}
                    className="mb-2"
                    style={{ color: Colors.primary }}
                  >
                    ৳{productData?.data.pricePerHour}
                  </Text>
                </div>
                <div>
                  <Text variant={"P3"}>
                    <strong>model:</strong> {productData?.data.model}
                  </Text>
                  <Text variant={"P3"}>
                    <strong>Brand:</strong> {productData?.data.brand}
                  </Text>
                </div>
                <Row className="mt-12">
                  <Button
                    color="primary"
                    className="text-white h-[48px] w-[200px] rounded-full font-poppins text-[16px]"
                    onClick={openModal}
                  >
                    Book Now
                  </Button>
                </Row>
              </Col>
            </Row>
            <div className="bg-white border border-[#E1E1E1] rounded-lg p-4 mt-8">
              <Text variant={"H4"}>Description</Text>
              <Text variant={"P4"} className="mt-2">
                {productData?.data.description}
              </Text>
            </div>
          </section>
        )}
      </Container>
      {isModalOpen && (
        <BookingModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          productData={productData?.data as TProduct}
        />
      )}
    </MainLayout>
  );
};
