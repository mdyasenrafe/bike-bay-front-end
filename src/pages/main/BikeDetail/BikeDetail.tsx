import React from "react";
import { useParams, useNavigate } from "react-router";
import { Col, Row } from "antd";
import {
  TProduct,
  useGetProductsByIdQuery,
} from "../../../redux/features/product";
import { MainLayout } from "../../../components/layouts/MainLayout";
import {
  AuthModal,
  Button,
  Container,
  LoadingSpinner,
  Text,
} from "../../../components/atoms";
import { Colors } from "../../../theme";
import { useModal } from "../../../hooks";
import { BookingModal } from "./components";
import { useCurrentToken } from "../../../redux/features/auth";
import { useAppSelector } from "../../../redux";
import { Modal } from "../../../components";

export const BikeDetail = () => {
  // hooks
  let { productId } = useParams();
  const { data: productData, isLoading } = useGetProductsByIdQuery(
    productId as string
  );
  const navigate = useNavigate();
  const { openModal, isModalOpen, closeModal } = useModal();
  const {
    isModalOpen: isAuthModalOpen,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
  } = useModal(); // For auth modal

  const isAvailable = productData?.data?.isAvailable;
  const token = useAppSelector(useCurrentToken); // Token to check if user is logged in

  const handleBookNow = () => {
    if (!token) {
      openAuthModal(); // Open the auth modal if the user is not logged in
    } else {
      openModal(); // Open the booking modal if the user is logged in
    }
  };

  const handleCompare = () => {
    navigate(`/compare-bikes?bikeId=${productData?.data._id}`);
  };

  return (
    <MainLayout>
      <Container>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <section>
            <Row className="bg-white border border-[#E1E1E1] rounded-lg p-4">
              <Col xs={24} md={12}>
                <div className="h-[400px] md:h-[600px] flex">
                  <img
                    src={productData?.data.thumb}
                    className="rounded-lg h-full lg:w-[90%]"
                    alt={productData?.data.name}
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
                    <strong>Model:</strong> {productData?.data.model}
                  </Text>
                  <Text variant={"P3"}>
                    <strong>Brand:</strong> {productData?.data.brand}
                  </Text>
                </div>

                {!isAvailable && (
                  <div className="bg-red-100 text-red-600 rounded-lg p-2 mt-4 w-fit px-2">
                    This bike is currently not available
                  </div>
                )}

                <Row className="mt-12">
                  <Button
                    color="primary"
                    className="text-white h-[48px] w-[200px] rounded-full font-poppins text-[16px]"
                    onClick={handleBookNow} // Call the handleBookNow function
                    disabled={!isAvailable}
                  >
                    {isAvailable ? "Book Now" : "Unavailable"}
                  </Button>
                </Row>

                {/* Compare Button */}
                <Row className="mt-4">
                  <Button
                    color="secondary"
                    className="text-white h-[48px] w-[200px] rounded-full font-poppins text-[16px]"
                    onClick={handleCompare}
                  >
                    Compare
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

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          productData={productData?.data as TProduct}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          closeAuthModal={closeAuthModal}
          isAuthModalOpen={isAuthModalOpen}
        />
      )}
    </MainLayout>
  );
};
