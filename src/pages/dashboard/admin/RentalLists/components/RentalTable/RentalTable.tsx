import React from "react";
import { Table, Button, Space } from "antd";
import { TRental } from "../../../../../../redux/features/rental";

type RentalTableProps = {
  rentals: TRental[];
  loading: boolean;
  handleCalculateClick: (rentalId: TRental) => void;
};

export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  loading,
  handleCalculateClick,
}) => {
  const columns = [
    {
      title: "Bike",
      dataIndex: ["bikeId", "name"],
      key: "bikeId",
    },
    {
      title: "User",
      dataIndex: ["userId", "name"],
      key: "userId",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (time: string) =>
        time ? new Date(time).toLocaleString() : "Not returned",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TRental) => (
        <Space>
          <Button type="primary" onClick={() => handleCalculateClick(record)}>
            Calculate
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={rentals}
      columns={columns}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
    />
  );
};
