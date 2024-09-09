import React, { useEffect, useMemo } from "react";
import { Table, Button, Row, Col, Card } from "antd";
import { TProduct } from "../../../../../redux/features/product";
import { useMediaQuery } from "react-responsive";

interface ComparisonTableProps {
  selectedBikes: TProduct[];
  removeBikeFromComparison: (bikeId: string) => void;
  isLoading: boolean;
  initialBikeId: string | null;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = React.memo(
  ({ selectedBikes, removeBikeFromComparison, isLoading, initialBikeId }) => {
    // Check if the user is using a small screen (mobile view)
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const columns = useMemo(
      () => [
        {
          title: "Attribute",
          dataIndex: "attribute",
          key: "attribute",
        },
        ...selectedBikes.map((bike) => ({
          title: bike.name,
          dataIndex: bike._id,
          key: bike._id,
          render: (value: any) => <span>{value}</span>,
        })),
      ],
      [selectedBikes]
    );

    const data = useMemo(
      () => [
        {
          key: "price",
          attribute: "Price Per Hour",
          ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
            acc[bike._id] = `৳${bike.pricePerHour}`;
            return acc;
          }, {}),
        },
        {
          key: "model",
          attribute: "Model",
          ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
            acc[bike._id] = bike.model;
            return acc;
          }, {}),
        },
        {
          key: "brand",
          attribute: "Brand",
          ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
            acc[bike._id] = bike.brand;
            return acc;
          }, {}),
        },
        {
          key: "availability",
          attribute: "Availability",
          ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
            acc[bike._id] = bike.isAvailable ? "Available" : "Unavailable";
            return acc;
          }, {}),
        },
      ],
      [selectedBikes]
    );

    return (
      <>
        {!isMobile ? (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={isLoading}
          />
        ) : (
          <Row gutter={[16, 16]} className="mt-4">
            {selectedBikes.map((bike) => (
              <Col key={bike._id} xs={24}>
                <Card
                  title={bike.name}
                  extra={
                    <Button
                      onClick={() => removeBikeFromComparison(bike._id)}
                      disabled={bike._id === initialBikeId}
                      type="primary"
                      danger
                    >
                      Remove
                    </Button>
                  }
                >
                  <p>
                    <strong>Price Per Hour:</strong> ৳{bike.pricePerHour}
                  </p>
                  <p>
                    <strong>Model:</strong> {bike.model}
                  </p>
                  <p>
                    <strong>Brand:</strong> {bike.brand}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {bike.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {!isMobile && (
          <Row className="mt-4 text-center">
            {selectedBikes.map((bike) => (
              <Col key={bike._id} xs={8}>
                <Button
                  key={bike._id}
                  color="danger"
                  onClick={() => removeBikeFromComparison(bike._id)}
                  className="mx-2"
                  disabled={bike?._id === initialBikeId}
                >
                  Remove {bike?.name}
                </Button>
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }
);
