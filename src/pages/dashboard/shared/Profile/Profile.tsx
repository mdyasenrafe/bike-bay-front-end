import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { useAppSelector } from "../../../../redux";
import { TUser, getCurrentUser } from "../../../../redux/features/auth";
import { Button, Container, Text } from "../../../../components/atoms";
import { Modal } from "../../../../components";
import { FormInput, FormWrapper } from "../../../../components/form";
import { MainLayout } from "../../../../components/layouts";
import { useModal } from "../../../../hooks";
import { EditProfileModal } from "./components";

export const Profile = () => {
  const user = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        {/* Personalized Welcome Message */}
        <Card className="mb-6 shadow-lg border rounded-lg p-6">
          <Text variant="H1" className="leading-[3rem] lg:leading-[4.75rem]">
            Welcome, {user?.name}!
          </Text>
          <Text variant="P2" className="mt-2 text-gray-600">
            We're glad to have you back. Below are your profile details. Feel
            free to edit any information by clicking the button below.
          </Text>
        </Card>

        <Card className="shadow-md border rounded-lg p-6">
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} lg={12}>
              <Text variant="H4" className="font-bold">
                Name:
              </Text>
              <Text variant="P2">{user?.name}</Text>
            </Col>
            <Col xs={24} lg={12}>
              <Text variant="H4" className="font-bold">
                Email:
              </Text>
              <Text variant="P2">{user?.email}</Text>
            </Col>
            <Col xs={24} lg={12}>
              <Text variant="H4" className="font-bold">
                Phone:
              </Text>
              <Text variant="P2">{user?.phone}</Text>
            </Col>
            <Col xs={24} lg={12}>
              <Text variant="H4" className="font-bold">
                Address:
              </Text>
              <Text variant="P2">{user?.address}</Text>
            </Col>
          </Row>

          <Button type="primary" className="mt-6" onClick={openModal}>
            Edit Profile
          </Button>
        </Card>

        {/* Edit Profile Modal */}
        {isModalOpen && (
          <EditProfileModal isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>
    </Container>
  );
};
