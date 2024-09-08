import React, { useState } from "react";
import { Card } from "antd";
import { SyntheticEvent } from "react";
import { Fade } from "react-awesome-reveal";
import { TProduct } from "../../../redux/features/product";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "../../atoms";
import { truncateText } from "../../../utils";

interface ProductCardProps {
  product: TProduct;
  editOption?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editOption,
}) => {
  const navigate = useNavigate();

  const onEdit = (event: SyntheticEvent, id: string) => {
    event.stopPropagation();
    navigate(`/dashboard/admin/edit/${id}`);
  };

  return (
    <Fade direction="up" triggerOnce={true}>
      <div onClick={() => navigate(`/bike-detail/${product._id}`)}>
        <Card
          hoverable
          cover={
            <img
              alt={product.name}
              src={product.thumb}
              className="h-48 object-cover w-full"
            />
          }
          className="border rounded-lg shadow-lg flex flex-col"
        >
          <Card.Meta
            title={<Text variant={"H5"}>{product.name}</Text>}
            description={
              <>
                <Text variant={"P2"}>
                  <strong>Model:</strong> {product.model}
                </Text>
                <Text variant={"P2"}>
                  <strong>Brand:</strong> {product.brand}
                </Text>

                <Text variant={"P4"} className="text-gray-600 my-1">
                  {truncateText(product.description, 30)}
                </Text>
                <Text variant={"H4"} className="font-bold my-1">
                  <strong>Price Per Hour:</strong>{" "}
                  <span className="text-primary">৳{product.pricePerHour}</span>
                </Text>
                {editOption ? (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      color="primary"
                      htmlType="button"
                      className="h-[37px] text-[16px] text-white mt-3 font-poppins"
                      onClick={(e) => onEdit(e, product._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      htmlType="button"
                      className="h-[37px] text-[16px] text-white mt-3 font-poppins"
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Button
                    color="primary"
                    htmlType="submit"
                    className="h-[37px] text-[16px] text-white mt-3 font-poppins"
                  >
                    Book Now
                  </Button>
                )}
              </>
            }
          />
        </Card>
      </div>
    </Fade>
  );
};
