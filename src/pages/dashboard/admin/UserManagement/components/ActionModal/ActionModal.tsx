import React from "react";
import { Modal, Button, Space } from "antd";
import { TUser } from "../../../../../../redux/features/auth";

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
      {actionType === "updateRole" && selectedUser && (
        <>
          <p>
            Are you sure you want to update the role for {selectedUser.name}?
          </p>
          <Space style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={onConfirm}>
              Yes
            </Button>
            <Button onClick={closeModal}>No</Button>
          </Space>
        </>
      )}

      {actionType === "delete" && selectedUser && (
        <>
          <p>Are you sure you want to delete {selectedUser.name}?</p>
          <Space style={{ marginTop: "20px" }}>
            <Button type="primary" danger onClick={onConfirm}>
              Yes
            </Button>
            <Button onClick={closeModal}>No</Button>
          </Space>
        </>
      )}
    </Modal>
  );
};
