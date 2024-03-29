import CircularProgress from "@mui/material/CircularProgress";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <p>Loading</p>
    </div>
  );
};

export default LoadingIndicator;
