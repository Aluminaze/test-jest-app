import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import { Asserts, date, object } from "yup";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    padding: "20px",
  },
}));

export const companySchema = object({
  yearEndDate: date().nullable().typeError("Invalid Date"),
});
export type Company = Asserts<typeof companySchema>;

const SearchPage = () => {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={classes.container}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Custom input"
            inputFormat="dd.MM.yyyy"
            mask="__.__.____"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <input ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default SearchPage;
