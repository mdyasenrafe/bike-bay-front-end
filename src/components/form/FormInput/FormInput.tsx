import React from "react";
import { Input, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

type TFormInputProps = {
  type: string;
  name: string;
  label?: string;
};

export const FormInput: React.FC<TFormInputProps> = React.forwardRef(
  ({ type, name, label }, ref) => {
    const { control } = useFormContext();
    return (
      <div style={{ marginBottom: "20px" }}>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={label}
              style={{ fontFamily: "Poppins" }}
              className="font-poppins"
            >
              <Input
                {...field}
                ref={ref as any}
                type={type}
                id={name}
                size="large"
                className={`font-poppins text-[14px]`}
              />
              {error && (
                <Text variant={"P5"} style={{ color: "red" }} className="mt-2">
                  {error.message}
                </Text>
              )}
            </Form.Item>
          )}
        />
      </div>
    );
  }
);
