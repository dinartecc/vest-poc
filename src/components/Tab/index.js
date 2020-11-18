import { Box } from "theme-ui";

const Tab = ({ children, currentTab, changeHandler, tabName }) => {
  const isActive = currentTab === tabName;

  return (
    <Box
      sx={{
        px: "20px",
        textAlign: "center",
        cursor: "pointer",
        borderBottom: "5px solid",
        borderColor: isActive ? "#ee2929" : "#ec7373",
        ...(isActive ? {} : { hover: { borderColor: "#e95353" } }),
        mx: "10px"
      }}
      onClick={() => changeHandler(tabName)}
    >
      {children}
    </Box>
  );
};

export default Tab;
