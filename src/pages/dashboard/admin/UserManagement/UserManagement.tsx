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

  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <div>
          <Text variant="H1" className="text-center mb-4 text-black">
            Manage Users
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            View, update, and manage user roles. Soft-delete users or adjust
            their permissions to maintain control over your platform.
          </Text>
        </div>

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
