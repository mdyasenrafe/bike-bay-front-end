import React, { useState } from "react";
import { MainLayout } from "../../../../components/layouts";
import {
  AdminSectionHeader,
  Container,
  Text,
} from "../../../../components/atoms";
import { ProductForm } from "../../../../components";
import {
  TProduct,
  useCreateProductMutation,
} from "../../../../redux/features/product";
import { SubmitHandler } from "react-hook-form";
import { useImageUploadMutation } from "../../../../api/updloadApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();
  const [addProduct, { isLoading }] = useCreateProductMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TProduct> = async (data: TProduct) => {
    try {
      if (data.thumb) {
        const thumbRes = await imageUpload({ url: data.thumb }).unwrap();

        if (thumbRes?.data?.url) {
          data.thumb = thumbRes.data.url;
        } else {
          toast.error("Something went wrong! Please try again");
        }
        const bodyData: TProduct = {
          ...data,
          pricePerHour: Number(data?.pricePerHour),
          cc: Number(data?.cc),
          year: Number(data?.year),
        };
        const res = await addProduct(bodyData);
        if (res.data) {
          toast.success("Product created successfully");
          navigate("/dashboard/admin/bike-management");
        } else {
          toast.error("Something went wrong! Please try again");
          navigate("/dashboard/admin/bike-management");
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <MainLayout>
      <Container>
        <AdminSectionHeader
          title="Add a New Bike to BikeBay"
          description="Add detailed information about the bike including the model, brand,
            price per hour, and more. Ensure that all details are accurate for
            the best customer experience. Don't forget to upload a clear image
            of the bike."
        />

        <ProductForm
          initialProductValues={{}}
          onSubmit={onSubmit}
          isLoading={imageLoading || isLoading}
        />
      </Container>
    </MainLayout>
  );
};
