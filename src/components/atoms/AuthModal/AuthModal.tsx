import React from "react";
import { Button, Text } from "../../../components/atoms";
import { useNavigate, useLocation } from "react-router";
import { Modal } from "../../Modal";

interface AuthModalProps {
  isAuthModalOpen: boolean;
  closeAuthModal: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isAuthModalOpen,
  closeAuthModal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal
      isModalOpen={isAuthModalOpen}
      closeModal={closeAuthModal}
      title="Login Required"
      centered
    >
      <div className="text-center">
        <Text variant="H5">
          To access this feature, including booking a bike or spinning the
          wheel, please log in or register an account.
        </Text>
        <div className="flex justify-between mt-5">
          <Button
            className="text-white w-[48%]"
            color="primary"
            onClick={() =>
              navigate("/signin", {
                state: { from: location },
              })
            }
          >
            Login
          </Button>
          <Button
            className="text-white w-[48%]"
            color="secondary"
            onClick={() =>
              navigate("/signup", {
                state: { from: location },
              })
            }
          >
            Register
          </Button>
        </div>
      </div>
    </Modal>
  );
};
