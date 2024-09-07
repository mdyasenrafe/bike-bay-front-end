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
import { TQueryParams } from "../../../../redux/features/types";

export const UserManagement: React.FC = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery([
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
  ]);

  const [updateRole] = useUpdateRoleMutation();
  const [softDeleteUser] = useSoftDeleteUserMutation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [actionType, setActionType] = useState<"updateRole" | "delete">();

  // Single handler to open modal for both actions
  const handleOpenModal = useCallback(
    (user: TUser, type: "updateRole" | "delete") => {
      setSelectedUser(user);
      setActionType(type);
      openModal();
    },
    [openModal]
  );

  // Single handler for both update role and soft delete actions
  const handleConfirmAction = useCallback(async () => {
    if (selectedUser) {
      try {
        if (actionType === "updateRole") {
          await updateRole(selectedUser._id).unwrap();
          message.success("User role updated successfully!");
        } else if (actionType === "delete") {
          await softDeleteUser(selectedUser._id).unwrap();
          message.success("User soft-deleted successfully!");
        }
        closeModal();
      } catch (error) {
        message.error("Failed to perform the action.");
      }
    }
  }, [selectedUser, actionType, updateRole, softDeleteUser, closeModal]);

  // Handle pagination changes in the table
  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Text variant="H1">User Management</Text>

        <UserTable
          users={usersData?.data as TUser[]}
          isLoading={isLoading || isFetching}
          meta={usersData?.meta}
          onUpdateRole={(user) => handleOpenModal(user, "updateRole")}
          onDelete={(user) => handleOpenModal(user, "delete")}
          onTableChange={handleTableChange}
        />
      </Container>

      <ActionModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        actionType={actionType!}
        selectedUser={selectedUser}
        onConfirm={handleConfirmAction}
      />
    </MainLayout>
  );
};
