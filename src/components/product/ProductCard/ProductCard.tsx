import React, { SyntheticEvent } from "react";
import { Card } from "antd";
import { Fade } from "react-awesome-reveal";
import { TProduct } from "../../../redux/features/product";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "../../atoms";
import { truncateText } from "../../../utils";
import { useModal } from "../../../hooks";
import { DeleteModal } from "./components";

interface ProductCardProps {
  product: TProduct;
  editOption?: boolean;
  compareMode?: boolean;
  handleCompareSelect?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editOption,
  compareMode,
  handleCompareSelect,
}) => {
  // hooks
  const navigate = useNavigate();
  const { openModal, isModalOpen, closeModal } = useModal();

  // functions
  const onEdit = (event: SyntheticEvent, id: string) => {
    event.stopPropagation();
    navigate(`/dashboard/admin/edit/${id}`);
  };

  const onDelete = (event: SyntheticEvent, id: string) => {
    event.stopPropagation();
    openModal();
  };

  // Check if the bike is available
  const isAvailable = product.isAvailable;

  // Handle compare selection
  const onCompareSelect = (event: SyntheticEvent, id: string) => {
    event.stopPropagation();
    if (handleCompareSelect) {
      handleCompareSelect(id);
    }
  };

  return (
    <Fade direction="up" triggerOnce={true}>
      <div
        className="relative hover:shadow-lg transition-shadow duration-300"
        onClick={
          isAvailable ? () => navigate(`/bike-detail/${product._id}`) : () => {}
        }
      >
        <Card
          hoverable
          cover={
            <img
              alt={product.name}
              src={product.thumb}
              className="h-48 object-cover w-full rounded-t-lg"
            />
          }
          className="border rounded-lg shadow-md flex flex-col"
        >
          <div className="p-4">
            <Card.Meta
              title={
                <Text variant={"H5"} className="dark:!text-black">
                  {product.name}
                </Text>
              }
              description={
                <>
                  <Text
                    variant={"P2"}
                    className="text-gray-800 dark:!text-black"
                  >
                    <strong>Model:</strong> {product.model}
                  </Text>
                  <Text
                    variant={"P2"}
                    className="text-gray-800 dark:!text-black"
                  >
                    <strong>Brand:</strong> {product.brand}
                  </Text>
                  <Text
                    variant={"P4"}
                    className="text-gray-600 my-1 dark:!text-black"
                  >
                    {truncateText(product.description, 40)}
                  </Text>
                  <Text
                    variant={"H4"}
                    className="font-bold my-2 dark:!text-black"
                  >
                    <strong>Price Per Hour:</strong>{" "}
                    <span className="text-primary">
                      ৳{product.pricePerHour}
                    </span>
                  </Text>

                  {!isAvailable && (
                    <div className="bg-red-100 text-red-600 rounded-lg p-2 my-3">
                      This bike is currently not available
                    </div>
                  )}

                  {compareMode ? (
                    <Button
                      color="primary"
                      htmlType="button"
                      className="w-full h-[37px] text-[16px] text-white mt-3 font-poppins"
                      onClick={(e) => onCompareSelect(e, product._id)}
                    >
                      Add to Compare
                    </Button>
                  ) : editOption ? (
                    <div className="flex space-x-2 mt-3">
                      <Button
                        color="primary"
                        htmlType="button"
                        className="h-[37px] text-[16px] text-white font-poppins"
                        onClick={(e) => onEdit(e, product._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        htmlType="button"
                        className="h-[37px] text-[16px] text-white font-poppins"
                        onClick={(e) => onDelete(e, product._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <Button
                      color="primary"
                      htmlType="submit"
                      className="w-full h-[37px] text-[16px] text-white mt-3 font-poppins"
                      disabled={!isAvailable}
                    >
                      {isAvailable ? "Book Now" : "Unavailable"}
                    </Button>
                  )}
                </>
              }
            />
          </div>
        </Card>
      </div>
      <DeleteModal
        product={product}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </Fade>
  );
};
