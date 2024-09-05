import { DatePicker, DatePickerProps, Form, Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type FormDatePickerProps = {
  label: string;
  name: string;
} & DatePickerProps;

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        console.log(error);
        return (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              {...props}
              style={{ width: "100%" }}
              size={"large"}
              className={`font-poppins text-[14px] `}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        );
      }}
    />
  );
};
