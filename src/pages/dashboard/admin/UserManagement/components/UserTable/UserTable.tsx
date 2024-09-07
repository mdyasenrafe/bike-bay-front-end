import React from "react";
import { Table, Space } from "antd";
import { TUser } from "../../../../../../redux/features/auth";
import { Button } from "../../../../../../components/atoms";

type UserTableProps = {
  users: TUser[];
  isLoading: boolean;
  onUpdateRole: (user: TUser) => void;
  onDelete: (user: TUser) => void;
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onUpdateRole,
  onDelete,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: TUser) => (
        <Space>
          <Button onClick={() => onUpdateRole(user)}>Update Role</Button>
          <Button
            danger
            onClick={() => onDelete(user)}
            disabled={user.status === "deleted"}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
    />
  );
};
