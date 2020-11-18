import { useState } from "react";
import { Box } from "theme-ui";
import Tab from "./components/Tab";

const App = () => {
  const [tab, setTab] = useState("userTab");
  return (
    <Box
      __css={{
        background:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        width: "100%",
        minHeight: "100vh",
        p: "20px"
      }}
    >
      <Box
        __css={{
          bg: "white",
          borderRadius: "20px",
          maxWidth: 800,
          p: "20px",
          width: "80%",
          my: "30px",
          mx: "auto",
          display: "flex"
        }}
      >
        <Box
          __css={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Tab currentTab={tab} changeHandler={setTab} tabName="userTab">
            User
          </Tab>
          <Tab currentTab={tab} changeHandler={setTab} tabName="additionalTab">
            Additional Information
          </Tab>
        </Box>
        <Box
          __css={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          {tab === "userTab" && <></>}
          {tab === "additionalTab" && <></>}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
