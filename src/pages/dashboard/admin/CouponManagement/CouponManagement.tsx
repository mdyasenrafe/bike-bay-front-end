import React, { useState } from "react";
import { Button, Table } from "antd";
import { useGetCouponsQuery } from "../../../../redux/features/coupon";
import { useModal } from "../../../../hooks";
import { TCoupon } from "../../../../redux/features/coupon/types";
import { CreateCouponModal, DeleteCouponModal } from "./components";

export const CouponManagement: React.FC = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  const {
    data: coupons,
    isLoading,
    isFetching,
  } = useGetCouponsQuery([
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
  ]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const [selectedCoupon, setSelectedCoupon] = React.useState<TCoupon | null>(
    null
  );

  const handleDeleteCoupon = (coupon: TCoupon) => {
    setSelectedCoupon(coupon);
    openDeleteModal();
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (coupon: TCoupon) => (
        <Button onClick={() => handleDeleteCoupon(coupon)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Coupon Management</h1>

      <Button type="primary" onClick={openModal}>
        Create Coupon
      </Button>

      <Table
        className="mt-6"
        columns={columns}
        dataSource={coupons?.data}
        rowKey="code"
        loading={isLoading || isFetching}
        pagination={{
          current: coupons?.meta?.page || 1,
          pageSize: coupons?.meta?.limit || 10,
          total: coupons?.meta?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        scroll={{ x: true }}
      />

      <CreateCouponModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <DeleteCouponModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        coupon={selectedCoupon}
      />
    </div>
  );
};
