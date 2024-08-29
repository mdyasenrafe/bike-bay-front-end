import React from "react";
import { Button as AButton } from "antd";
import { ButtonProps } from "antd/lib/button";
import { ReactNode } from "react";
import { ColorKey, Colors } from "../../../theme/colors";

interface ButtonProp extends ButtonProps {
  color?: ColorKey;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProp> = ({
  children,
  color,
  icon,
  ...props
}) => {
  // Apply custom color styles if colorKey is provided
  console.log(color);
  const style = color
    ? {
        backgroundColor: Colors[color],
        borderColor: Colors[color],
        fontSize: 16,
      }
    : { fontSize: 16 };

  return (
    <AButton {...props} icon={icon} style={style}>
      {children}
    </AButton>
  );
};
