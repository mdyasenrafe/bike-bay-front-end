import React from "react";
import { FormInput, FormWrapper } from "../../../../../../components/form";
import { Modal } from "../../../../../../components";
import { Button } from "../../../../../../components/atoms";
import {
  TUpdateValue,
  TUser,
  getCurrentUser,
  useUpdateMutation,
} from "../../../../../../redux/features/auth";
import { useAppSelector } from "../../../../../../redux";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../../../../../Schema";

export type EditProfileModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const user = useAppSelector(getCurrentUser);
  // hooks
  const [updateUser, { isLoading }] = useUpdateMutation();

  const onSubmit: SubmitHandler<TUpdateValue> = async (data) => {
    try {
      const res = await updateUser(data).unwrap();
      toast.success(res?.message);
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Edit Profile"
    >
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={user as TUser}
        resolver={zodResolver(updateUserSchema)}
      >
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <FormInput name="phone" label="Phone" />
        <FormInput name="address" label="Address" />
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-4"
          loading={isLoading}
          disabled={isLoading}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </Modal>
  );
};
