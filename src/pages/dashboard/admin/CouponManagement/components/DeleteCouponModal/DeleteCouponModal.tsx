import React from "react";
import { Modal, Button } from "antd";
import { TCoupon } from "../../../../../../redux/features/coupon/types";
import { Text } from "../../../../../../components/atoms";
import { toast } from "sonner";
import { useDeleteCouponMutation } from "../../../../../../redux/features/coupon";

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
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();
  const handleDelete = async () => {
    try {
      await deleteCoupon(coupon?._id as string).unwrap();
      closeModal();
      toast.success("Coupon deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Modal
      title="Delete Coupon"
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <Text variant="P4">
        Are you sure you want to delete the coupon "{coupon?.code}"?
      </Text>
      <div className="flex justify-end mt-4">
        <Button className="mr-2" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          disabled={isLoading}
          loading={isLoading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
