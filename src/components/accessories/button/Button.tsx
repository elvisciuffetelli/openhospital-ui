import { Button as MaterialComponent } from "@mui/material";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  color = "primary",
  variant,
  disabled,
  dataCy,
  onClick,
  className,
}) => {
  return (
    <MaterialComponent
      className={"button " + className ?? ""}
      type={type}
      color={color}
      variant={variant}
      disableElevation
      disabled={disabled}
      onClick={onClick}
      data-cy={dataCy}
    >
      {children}
    </MaterialComponent>
  );
};

export default Button;
