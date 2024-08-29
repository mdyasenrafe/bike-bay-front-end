import React from "react";
import { Input, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

type TFormInputProps = {
  type: string;
  name: string;
  label?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
};

export const FormInput: React.FC<TFormInputProps> = React.forwardRef(
  ({ type, name, label, style, inputStyle }, ref) => {
    const defaultStyle: React.CSSProperties = {
      marginBottom: "20px",
    };
    return (
      <div style={{ ...defaultStyle, ...style }}>
        <Controller
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Form.Item label={label} className="font-poppins mb-0 border-0">
              <Input
                {...field}
                ref={ref as any}
                type={type}
                id={name}
                size="large"
                className={`font-poppins text-[14px] `}
                style={inputStyle}
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
