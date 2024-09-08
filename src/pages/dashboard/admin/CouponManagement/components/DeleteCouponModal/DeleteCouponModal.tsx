import React from "react";
import { Modal, Button } from "antd";
import { TCoupon } from "../../../../../../redux/features/coupon/types";

type DeleteCouponModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  coupon: TCoupon | null;
};

export const DeleteCouponModal: React.FC<DeleteCouponModalProps> = ({
  isModalOpen,
  closeModal,
  coupon,
}) => {
  const handleDelete = async () => {
    closeModal();
  };

  return (
    <Modal
      title="Delete Coupon"
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <p>Are you sure you want to delete the coupon "{coupon?.code}"?</p>
      <div className="flex justify-end mt-4">
        <Button className="mr-2" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="primary" danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
