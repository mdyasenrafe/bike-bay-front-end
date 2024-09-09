import React from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  Text,
} from "../../../../../components/atoms";
import { useGetProductsQuery } from "../../../../../redux/features/product";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { ProductCard } from "../../../../../components/product";
import { Fade, Slide } from "react-awesome-reveal";

export const FeatureProduct = () => {
  const { data, isLoading } = useGetProductsQuery({
    limit: 10,
    page: 1,
    sort: "-createdAt",
    isAvailable: true,
    status: "active",
  });

  const navigate = useNavigate();
  return (
    <section className="py-40">
      <Container>
        <div>
          <Slide triggerOnce={true}>
            <Text variant="H1" className="text-center mb-4 text-black">
              Feature Products
            </Text>
          </Slide>
          <Fade delay={1e3} cascade damping={1e-1} triggerOnce={true}>
            <Text
              variant="P3"
              style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
              className="text-black pb-16"
            >
              Discover our latest featured bikes and explore their unique
              features.
            </Text>
          </Fade>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            {data?.data?.map((product, index) => (
              <Col key={product._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        <div className="flex justify-center mt-8">
          <Button
            color="primary"
            onClick={() => navigate("/bikes")}
            className="text-white h-[40px] w-[232px] mt-4"
          >
            See More
          </Button>
        </div>
      </Container>
    </section>
  );
};
