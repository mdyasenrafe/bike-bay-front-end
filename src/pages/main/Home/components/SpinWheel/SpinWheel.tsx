import React, { useState } from "react";
import { toast } from "sonner";
import "./spinWheel.css";
import { useGetCouponsQuery } from "../../../../../redux/features/coupon";
import { useModal } from "../../../../../hooks";
import { CouponModal } from "./components";
import { TCoupon } from "../../../../../redux/features/coupon/types";
import { useAppSelector } from "../../../../../redux";
import { useCurrentToken } from "../../../../../redux/features/auth";
import { AuthModal, Container, Text } from "../../../../../components/atoms";
import { MainLayout } from "../../../../../components/layouts";
import { Col, Row } from "antd";
import { Fade } from "react-awesome-reveal";

export const SpinWheel: React.FC = () => {
  const { data: couponsData } = useGetCouponsQuery([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<TCoupon>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isAuthModalOpen,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
  } = useModal();
  const token = useAppSelector(useCurrentToken);

  const segments = couponsData?.data.map((coupon) => coupon) || [];

  const spinWheel = () => {
    if (isSpinning) return;
    if (!token) {
      openAuthModal();
    }
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * segments.length);
    const chosenCoupon = segments[randomIndex];

    setTimeout(() => {
      setSelectedCoupon(chosenCoupon);
      openModal();
      toast.success(`Congratulations! You've won the coupon: ${chosenCoupon}`);
      localStorage.setItem("savedCoupon", chosenCoupon.code);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <section className="py-20 testimonial-section">
      <Container>
        <div className="div">
          <Text variant="H1" className="text-center mb-4 text-white">
            Spin the Wheel and Win Amazing Rewards
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-white pb-16"
          >
            Feeling lucky? Take a spin on our Wheel of Fortune and win exclusive
            discounts, coupons, and special offers for your next bike rental at
            BikeBay. Simply hit the spin button, and let the magic happen!
            You’ll have the chance to win big while enjoying an exciting
            experience. Don’t forget to log in for your chance to play!
          </Text>
        </div>
      </Container>
      <Container>
        <Row align="middle">
          <Col md={12}>
            <Fade cascade duration={2500} triggerOnce={true}>
              <div>
                <img
                  src={"https://i.ibb.co.com/xYGQ6jV/image.png"}
                  alt="Coupon illustration"
                  className="max-w-full h-auto object-cover"
                />
              </div>
            </Fade>
          </Col>
          <Col md={12}>
            <Fade cascade duration={2500} triggerOnce={true}>
              <div className="relative w-[300px] h-[300px] rounded-full shadow-lg spin-wheel">
                <div
                  className={`absolute w-full h-full transform transition-all duration-1000 ease-out ${
                    isSpinning ? "spinning" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={spinWheel}
                      className={`py-3 px-8 bg-red-500 text-white rounded-full text-lg font-semibold ${
                        isSpinning ? "opacity-50" : ""
                      }`}
                      disabled={isSpinning}
                    >
                      {isSpinning ? "Spinning..." : "Spin"}
                    </button>
                  </div>
                </div>

                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"></div>
                </div>
              </div>
            </Fade>
          </Col>
        </Row>
        {selectedCoupon && (
          <CouponModal
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            selectedCoupon={selectedCoupon}
          />
        )}
        {isAuthModalOpen && (
          <AuthModal
            closeAuthModal={closeAuthModal}
            isAuthModalOpen={isAuthModalOpen}
          />
        )}
      </Container>
    </section>
  );
};
