import React, { useEffect, useMemo } from "react";
import { Table, Button, Row, Col } from "antd";
import { TProduct } from "../../../../../redux/features/product";

interface ComparisonTableProps {
  selectedBikes: TProduct[];
  removeBikeFromComparison: (bikeId: string) => void;
  isLoading: boolean;
  initialBikeId: string | null;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = React.memo(
  ({ selectedBikes, removeBikeFromComparison, isLoading, initialBikeId }) => {
    console.log(initialBikeId);
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
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isLoading}
        />
        <Row className="mt-4 text-center">
          {selectedBikes.map((bike) => (
            <Col key={bike._id} span={8}>
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
      </>
    );
  }
);
