import React from "react";
import { Modal, Space } from "antd";
import { TUser } from "../../../../../../redux/features/auth";
import { Button, Text } from "../../../../../../components/atoms";

type ActionModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  actionType: "updateRole" | "delete";
  selectedUser: TUser | null;
  onConfirm: () => void;
};

export const ActionModal: React.FC<ActionModalProps> = ({
  isModalOpen,
  closeModal,
  actionType,
  selectedUser,
  onConfirm,
}) => {
  return (
    <Modal
      title={actionType === "updateRole" ? "Update User Role" : "Delete User"}
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
    >
      {selectedUser && (
        <>
          {actionType == "updateRole" ? (
            <Text>
              Are you sure you want to update the role for {selectedUser.name}?
            </Text>
          ) : (
            <Text variant="H4">
              Are you sure you want to delete {selectedUser.name}?{" "}
            </Text>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              type="primary"
              danger
              onClick={onConfirm}
              className="w-[48%]"
            >
              Yes
            </Button>
            <Button onClick={closeModal} className="w-[48%]">
              No
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
