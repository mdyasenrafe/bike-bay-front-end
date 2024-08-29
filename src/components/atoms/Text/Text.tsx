import React, { CSSProperties, HTMLAttributes } from "react";
import { Typography } from "antd";
import { TextStyles, TextVariant } from "../../../theme";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  className?: string;
  style?: CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  variant = "Body",
  children,
  className = "",
  ...props
}) => {
  const textStyle = `${TextStyles[variant]} ${className} block`;
  return (
    <Typography.Text className={textStyle} {...props}>
      {children}
    </Typography.Text>
  );
};
