import React from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  Text,
} from "../../../../../components/atoms";
import { useAppSelector } from "../../../../../redux";
import {
  getProducts,
  useGetProductsQuery,
} from "../../../../../redux/features/product";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { ProductCard } from "../../../../../components/product";

export const FeatureProduct = () => {
  const { data, isLoading } = useGetProductsQuery({
    limit: 10,
    page: 1,
    sort: "-createdAt",
  });

  const featuredProducts = useAppSelector(getProducts);

  const navigate = useNavigate();
  return (
    <section className="py-40">
      <Container>
        <div>
          <Text variant="H1" className="text-center mb-4 text-black">
            Feature Products
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Discover our latest featured products and explore their unique
            features.
          </Text>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            {featuredProducts.map((product, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        <div className="flex justify-center mt-8">
          <Button
            color="primary"
            onClick={() => navigate("/products")}
            className="text-white h-[40px] w-[232px] mt-4"
          >
            See More
          </Button>
        </div>
      </Container>
    </section>
  );
};
