import React, { FunctionComponent, useEffect, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";
import { Checkbox, FormControlLabel } from "@material-ui/core";
const CheckboxField: FunctionComponent<IProps> = ({
  fieldName,
  checked,
  disabled,
  label,
  onChange,
}) => {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  const handleChange = (event: any, value: boolean) => {
    onChange(value);
    setValue(value);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={disabled}
          checked={value}
          onChange={handleChange}
          name={fieldName}
        />
      }
      label={label}
    />
  );
};

export default CheckboxField;
