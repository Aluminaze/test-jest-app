import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  blockTable: {
    margin: "20px 0",
  },
  blockPagination: {
    margin: "20px 0",
    display: "flex",
    flexBasis: "100%",
    justifyContent: "center",
  },
  blockSetting: {
    display: "flex",
    gap: "10px",
  },
}));
