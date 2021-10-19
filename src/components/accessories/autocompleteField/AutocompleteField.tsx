import { debounce, FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { Fragment, FC, useCallback, useEffect, useState } from "react";
import { DefaultOptionType, IProps } from "./types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { Autocomplete } from "@material-ui/lab";

const AutocompleteField: FC<IProps> = ({
  fieldName,
  id = fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  options,
  isLoading = false,
  disabled,
  theme,
  freeSolo,
  onInputChange,
  getOptionLabel,
  renderOption,
  getOptionSelected,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const { t } = useTranslation();

  const getFullObj = (val: string) => {
    return options?.find((el) => el.value === val) || null;
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur(e, value);
  };

  const debounceUpdate = useCallback(
    debounce((value: any) => {
      setValue(value);
    }, 250),
    []
  );

  useEffect(() => {
    setValue(fieldValue + "");
  }, [fieldValue]);

  const handleOnChange = (e: object, val: any | null) => {
    if (onChange) onChange(e, val);
    else {
      debounceUpdate(val?.value || "");
    }
  };

  const optionLabel = (option: DefaultOptionType) => {
    return option.label;
  };

  const isSelected = (option: DefaultOptionType, v: DefaultOptionType) => {
    return option.value === v.value;
  };

  const rendOption = (option: DefaultOptionType) => {
    return <Fragment>{option.label}</Fragment>;
  };

  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";
  return (
    <FormControl variant="outlined" className={actualClassName}>
      <Autocomplete
        id={id}
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        freeSolo={freeSolo}
        loading={isLoading}
        options={options}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel ? getOptionLabel : optionLabel}
        value={getFullObj(value)}
        getOptionSelected={getOptionSelected ? getOptionSelected : isSelected}
        renderOption={renderOption ? renderOption : rendOption}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <TextField
            label={label}
            {...params}
            name={fieldName}
            variant="outlined"
            size="small"
            error={isValid}
            fullWidth
          />
        )}
      />
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default AutocompleteField;
