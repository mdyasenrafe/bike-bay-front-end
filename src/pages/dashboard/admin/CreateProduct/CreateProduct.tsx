import React, { useState } from "react";
import { MainLayout } from "../../../../components/layouts";
import { Container } from "../../../../components/atoms";
import { ProductForm } from "../../../../components";
import { TProduct } from "../../../../redux/features/product";
import { SubmitHandler } from "react-hook-form";

export const CreateProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TProduct> = async (data: TProduct) => {
    console.log(data);
  };
  return (
    <MainLayout>
      <Container>
        <ProductForm
          initialProductValues={{}}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Container>
    </MainLayout>
  );
};
