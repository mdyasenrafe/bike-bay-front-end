import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormTextArea, FormWrapper } from "../form";
import { Button } from "../atoms";
import { TProduct } from "../../redux/features/product";
import { FormUpload } from "../form/FormUpload";

interface ProductFormProps {
  initialProductValues: Partial<TProduct>;
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialProductValues,
  onSubmit,
  isLoading,
}) => {
  return (
    <FormWrapper onSubmit={onSubmit} defaultValues={initialProductValues}>
      <FormInput type="text" name="name" label="Bike Name" />
      <FormTextArea name="description" label="Description" />
      <FormInput type="number" name="pricePerHour" label="Price Per Hour" />
      <FormInput type="number" name="cc" label="CC" />
      <FormInput type="text" name="model" label="Model" />
      <FormInput type="text" name="brand" label="Brand" />
      <FormInput type="number" name="year" label="Year" />
      <FormUpload name="thumb" />

      <Button
        color="primary"
        htmlType="submit"
        className="w-full h-[48px] text-[18px] text-white"
        loading={isLoading}
        disabled={isLoading}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};
