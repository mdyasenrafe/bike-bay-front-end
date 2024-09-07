import React from "react";
import { Table, Button, Space } from "antd";
import { TRental } from "../../../../../../redux/features/rental";
import { TMeta } from "../../../../../../redux/features/types";
import { formatEndTime, formatStartTime } from "../../../../../../utils";

type RentalTableProps = {
  rentals: TRental[];
  loading: boolean;
  handleCalculateClick: (rentalId: TRental) => void;
  meta: TMeta | undefined;
  onTableChange: (pagination: any) => void;
};

export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  loading,
  handleCalculateClick,
  meta,
  onTableChange,
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
      render: (time: string) => formatStartTime(time),
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (time: string) => (time ? formatEndTime(time) : "Not returned"),
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
      pagination={{
        current: meta?.page || 1,
        pageSize: meta?.limit || 10,
        total: meta?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      onChange={onTableChange}
      scroll={{ x: true }}
    />
  );
};
