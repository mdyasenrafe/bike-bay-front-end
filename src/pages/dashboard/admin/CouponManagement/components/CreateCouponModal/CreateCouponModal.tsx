import React from "react";
import { Modal } from "antd";
import { useCreateCouponMutation } from "../../../../../../redux/features/coupon";
import { TCouponRequest } from "../../../../../../redux/features/coupon/types";
import {
  FormInput,
  FormSelect,
  FormWrapper,
} from "../../../../../../components/form";
import { Button } from "../../../../../../components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCouponSchema } from "../../../../../../Schema";
import { toast } from "sonner";

type CreateCouponModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export const CreateCouponModal: React.FC<CreateCouponModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const handleSubmit = async (data: TCouponRequest) => {
    try {
      await createCoupon(data).unwrap();
      toast.success("Coupon created successfully!");
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Modal
      title="Create Coupon"
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(createCouponSchema)}
      >
        <FormInput name="code" label="Coupon Code" />
        <FormSelect
          name="discountType"
          label="Discount Type"
          options={[
            { label: "Percentage", value: "percentage" },
            { label: "Fixed", value: "fixed" },
          ]}
        />
        <FormInput name="discountValue" label="Discount Value" type="number" />
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-4"
          loading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
};
