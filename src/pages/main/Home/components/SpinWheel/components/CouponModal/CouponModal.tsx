import React from "react";
import { Modal } from "../../../../../../../components";
import { TCoupon } from "../../../../../../../redux/features/coupon/types";
import { toast } from "sonner";

type CouponModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedCoupon: TCoupon;
};

export const CouponModal: React.FC<CouponModalProps> = ({
  isModalOpen,
  closeModal,
  selectedCoupon,
}) => {
  const copyCouponCode = () => {
    navigator.clipboard.writeText(selectedCoupon.code);
    toast.success("Coupon code copied to clipboard!");
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Coupon Won!"
    >
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
        <p className="mb-4">
          You won a coupon: <strong>{selectedCoupon?.code}</strong>
        </p>
        <p className="text-gray-600">
          You can use this coupon on your next rental. The coupon will remain
          valid until the admin deletes it.
        </p>

        <div className="mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={copyCouponCode}
          >
            Copy Coupon Code
          </button>
        </div>

        <button
          className="bg-primary text-white py-2 px-4 rounded mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
