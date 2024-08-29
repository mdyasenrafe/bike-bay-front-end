import React from "react";
import { Select, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

export const FormSelect: React.FC<TFormSelectProps> = React.forwardRef(
  ({ name, label, options }, ref) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item label={label}>
              <Select
                style={{ width: "100%", fontSize: 14 }}
                {...field}
                ref={ref as any}
                options={options}
                size="large"
                allowClear
                className={`font-poppins text-[14px] ${
                  error && "border-red-500"
                }`}
              />
              {error && (
                <Text variant={"P6"} style={{ color: "red" }}>
                  {error.message}
                </Text>
              )}
            </Form.Item>
          );
        }}
      />
    );
  }
);

FormSelect.displayName = "FormSelect";
