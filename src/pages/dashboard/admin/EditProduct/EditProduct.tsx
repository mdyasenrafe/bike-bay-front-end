import React from "react";
import { useImageUploadMutation } from "../../../../api/updloadApi";
import {
  TProduct,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/product";
import { useNavigate, useParams } from "react-router-dom";
import {
  AdminSectionHeader,
  Container,
  LoadingSpinner,
  Text,
} from "../../../../components/atoms";
import { MainLayout } from "../../../../components/layouts";
import { ProductForm } from "../../../../components";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const EditProduct = () => {
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();
  let { productId } = useParams();
  const { data: ProductData, isLoading } = useGetProductsByIdQuery(
    productId as string
  );
  const [editProduct, { isLoading: editLoading }] = useUpdateProductMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    try {
      const initialProductValues = ProductData?.data as TProduct;
      if (data.thumb !== initialProductValues?.thumb) {
        const thumbRes = await imageUpload({ url: data.thumb }).unwrap();
        data.thumb = thumbRes?.data?.url;
      } else {
        data.thumb = initialProductValues?.thumb;
      }

      data._id = initialProductValues._id;
      const bodyData: TProduct = {
        ...data,
        pricePerHour: Number(data?.pricePerHour),
        cc: Number(data?.cc),
        year: Number(data?.year),
      };
      const res = await editProduct(bodyData);
      toast.success("Product updated successfully");
      navigate("/dashboard/admin/bike-management");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <MainLayout>
      <Container>
        <AdminSectionHeader
          title="Edit Bike Information"
          description="Update the details of the bike including name, model, price, and
          other specifications. Ensure that the information provided is
          accurate for the best user experience."
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ProductForm
            initialProductValues={ProductData?.data as TProduct}
            onSubmit={onSubmit}
            isLoading={imageLoading || editLoading}
          />
        )}
      </Container>
    </MainLayout>
  );
};
