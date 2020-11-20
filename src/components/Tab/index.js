import { Box } from "theme-ui";

const Tab = ({ children, currentTab, changeHandler, result, tabName }) => {
  // get errors for the whole group
  const isActive = currentTab === tabName;
  const tabErrorCount = Object.keys(result.getErrorsByGroup(tabName)).length;

  return (
    <Box
      __css={{
        px: "20px",
        textAlign: "center",
        cursor: "pointer",
        borderBottom: "5px solid",
        position: "relative",
        borderColor: isActive ? "valid" : "#bad6d2",
        ...(isActive ? {} : { ":hover": { borderColor: "#64d9c6" } }),
        mx: "20px",
      }}
      onClick={() => changeHandler(tabName)}
    >
      {children}

      <Box
        __css={{
          color: "white",
          p: "5px",
          borderRadius: "5px",
          position: "absolute",
          minWidth: "100px",
          top: "-85px",
          opacity: !isActive && tabErrorCount ? 1 : 0,
          transition: "0.25s ease-in-out",
          transform: "translate(-50%,100%)",
          left: "50%",
          bg: "error",
          ":before": {
            border: "solid transparent",
            borderTopColor: "error",
            borderWidth: "12px 15px 0",
            top: "25px",
            content: "''",
            display: "block",
            left: "50%",
            opacity: "1",
            position: "absolute",
            transform: "translate(-50%,100%)",
          },
        }}
      >
        {`${tabErrorCount} error(s)`}
      </Box>
    </Box>
  );
};

export default Tab;
