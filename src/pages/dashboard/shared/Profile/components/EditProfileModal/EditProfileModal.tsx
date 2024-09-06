import React from "react";
import { FormInput, FormWrapper } from "../../../../../../components/form";
import { Modal } from "../../../../../../components";
import { Button } from "../../../../../../components/atoms";
import { TUser, getCurrentUser } from "../../../../../../redux/features/auth";
import { useAppSelector } from "../../../../../../redux";

export type EditProfileModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const user = useAppSelector(getCurrentUser);

  const handleSubmit = (data: Partial<TUser>) => {
    console.log("Updated user data:", data);
    closeModal();
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Edit Profile"
    >
      <FormWrapper onSubmit={handleSubmit} defaultValues={user as TUser}>
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <FormInput name="phone" label="Phone" />
        <FormInput name="address" label="Address" />
        <Button type="primary" htmlType="submit" className="w-full mt-4">
          Save Changes
        </Button>
      </FormWrapper>
    </Modal>
  );
};
