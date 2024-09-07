import React from "react";
import { Table, Button } from "antd";
import { TRental } from "../../../../../../redux/features/rental";

interface RentalTableProps {
  rentals: TRental[];
  loading: boolean;
  onCalculateClick: (rentalId: string) => void;
}

export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  loading,
  onCalculateClick,
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
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => onCalculateClick(record._id)}>
          Calculate
        </Button>
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
