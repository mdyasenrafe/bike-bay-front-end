import { DatePicker, Form, Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type FormDatePickerProps = {
  label: string;
  name: string;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker style={{ width: "100%" }} {...field} />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};
