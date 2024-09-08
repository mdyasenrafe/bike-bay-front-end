import React from "react";
import { TProduct } from "../../../../../redux/features/product";
import { Modal } from "../../../../Modal";
import { Button, Text } from "../../../../atoms";
import { useDeleteProductMutation } from "../../../../../redux/features/product";
import { toast } from "sonner"; // Sonner toast notification

type DeleteModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  product: TProduct;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isModalOpen,
  closeModal,
  product,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap();
      toast.success(`Bike ${product.name} deleted successfully.`);
      closeModal();
    } catch (error: any) {
      toast.error(`Failed to delete bike: ${error.message}`);
    }
  };

  return (
    <Modal
      title="Confirm Bike Deletion"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <Text>
        Are you sure you want to delete the bike
        <strong> {product.name}</strong>? This action is permanent and cannot be
        undone.
      </Text>
      <div className="flex justify-between">
        <Button
          color="grey"
          onClick={closeModal}
          className="text-white mt-4 w-[48%]"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleDelete}
          loading={isLoading}
          className="text-white mt-4 w-[48%]"
        >
          Delete Bike
        </Button>
      </div>
    </Modal>
  );
};
