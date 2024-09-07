import React, { useCallback, useState } from "react";
import { message } from "antd";
import { Container, Text } from "../../../../components/atoms";
import { MainLayout } from "../../../../components/layouts";
import {
  useGetAllUsersQuery,
  useSoftDeleteUserMutation,
  useUpdateRoleMutation,
} from "../../../../redux/features/users";
import { TUser } from "../../../../redux/features/auth";
import { useModal } from "../../../../hooks";
import { ActionModal, UserTable } from "./components";

export const UserManagement: React.FC = () => {
  const { data: usersData, isLoading, isFetching } = useGetAllUsersQuery();
  const [updateRole] = useUpdateRoleMutation();
  const [softDeleteUser] = useSoftDeleteUserMutation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [actionType, setActionType] = useState<"updateRole" | "delete">();

  const handleOpenModal = useCallback(
    (user: TUser, type: "updateRole" | "delete") => {
      setSelectedUser(user);
      setActionType(type);
      openModal();
    },
    [openModal]
  );

  const handleUpdateRole = async () => {
    if (selectedUser) {
      try {
        await updateRole(selectedUser._id);
        message.success("User role updated successfully!");
        closeModal();
      } catch (error) {
        message.error("Failed to update user role.");
      }
    }
  };

  const handleSoftDelete = async () => {
    if (selectedUser) {
      try {
        await softDeleteUser(selectedUser._id);
        message.success("User soft-deleted successfully!");
        closeModal();
      } catch (error) {
        message.error("Failed to soft-delete user.");
      }
    }
  };

  return (
    <MainLayout>
      <Container>
        <Text variant="H1">User Management</Text>

        <UserTable
          users={usersData?.data as TUser[]}
          isLoading={isLoading || isFetching}
          onUpdateRole={(user) => handleOpenModal(user, "updateRole")}
          onDelete={(user) => handleOpenModal(user, "delete")}
        />
      </Container>

      <ActionModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        actionType={actionType!}
        selectedUser={selectedUser}
        onConfirm={
          actionType === "updateRole" ? handleUpdateRole : handleSoftDelete
        }
      />
    </MainLayout>
  );
};
