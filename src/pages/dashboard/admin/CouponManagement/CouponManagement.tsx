import React, { useCallback, useState } from "react";
import { Table } from "antd";
import { useGetCouponsQuery } from "../../../../redux/features/coupon";
import { useModal } from "../../../../hooks";
import { TCoupon } from "../../../../redux/features/coupon/types";
import { CreateCouponModal, DeleteCouponModal } from "./components";
import { Colors } from "../../../../theme";
import { MainLayout } from "../../../../components/layouts";
import {
  AdminSectionHeader,
  Button,
  Container,
  Text,
} from "../../../../components/atoms";
import { FaPlus } from "react-icons/fa";

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
      render: (status: boolean) => (
        <span
          style={{
            color: status ? Colors.green : Colors.red,
          }}
        >
          {status ? "Active" : "Deleted"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (coupon: TCoupon) => (
        <Button
          onClick={() => handleDeleteCoupon(coupon)}
          danger
          disabled={!coupon?.isActive}
        >
          Delete
        </Button>
      ),
    },
  ];
  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <div>
          <AdminSectionHeader
            title="Manage BikeBay Coupons"
            description="  Here you can view, create, update, and manage all discount coupons
              available in the BikeBay system. Keep track of active and inactive
              coupons and handle promotions easily."
          />

          <div className="text-end mb-6">
            <Button
              color="primary"
              icon={<FaPlus />}
              size="large"
              className="text-white"
              onClick={openModal}
            >
              Create New Coupon
            </Button>
          </div>
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
            onChange={handleTableChange}
          />

          <CreateCouponModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />

          <DeleteCouponModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            coupon={selectedCoupon}
          />
        </div>
      </Container>
    </MainLayout>
  );
};
