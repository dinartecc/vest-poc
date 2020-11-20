import { useState } from "react";
import { Box } from "theme-ui";
import vest from "vest";
import Tab from "./components/Tab";
import Input from "./components/Input";
import validate from "./validate";
import _ from "lodash";

const App = () => {
  const [tab, setTab] = useState("userTab");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(vest.get("myform"));
  const [loadingMachine, setLoadingMachine] = useState(false);

  const handleValidation = ({ name, value, tab }) => {
    const res = validate({ ...formData, [name]: value }, { field: name, tab });
    setResult(res);

    if (name === "machineName") {
      setLoadingMachine(true);
      res.done((result) => {
        setLoadingMachine(false);
        setResult(result);
      });
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateChange = (name, value) => {
    handleChange(name, value);
    handleValidation({ name, value });
  };

  const calculateMachineName = (e) => {
    if (!formData.machineName && e.target.value !== "") {
      validateChange("machineName", `field_${_.snakeCase(e.target.value)}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = validate(formData, {});
    res.done((result) =>
      result.hasErrors()
        ? setResult(result)
        : console.log("Submitted", formData)
    );
  };

  return (
    <Box
      __css={{
        background:
          "linear-gradient(90deg, rgba(158,115,187,1) 0%, rgba(255,133,133,1) 50%, rgba(255,199,121,1) 100%)",
        width: "100%",
        minHeight: "100vh",
        p: "20px",
      }}
    >
      <Box
        as="form"
        autocomplete="off"
        __css={{
          bg: "white",
          borderRadius: "20px",
          maxWidth: 800,
          p: "40px",
          my: "30px",
          mx: "auto",
        }}
      >
        <Box
          __css={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Tab
            currentTab={tab}
            result={result}
            changeHandler={setTab}
            tabName="userTab"
          >
            User
          </Tab>
          <Tab
            currentTab={tab}
            result={result}
            changeHandler={setTab}
            tabName="additionalTab"
          >
            Additional Information
          </Tab>
        </Box>
        <Box
          __css={{
            display: "flex",
            flexDirection: "column",
            height: "280px",
          }}
        >
          {tab === "userTab" && (
            <>
              <Input
                result={result}
                value={formData.username}
                tab="userTab"
                name="username"
                label="Username"
                onChange={validateChange}
              />
              <Input
                type="password"
                result={result}
                value={formData.password}
                tab="userTab"
                name="password"
                label="Password"
                onChange={validateChange}
              />
              <Input
                type="password"
                result={result}
                value={formData.confirmPassword}
                tab="userTab"
                name="confirmPassword"
                label="Confirm Password"
                onChange={validateChange}
              />
            </>
          )}
          {tab === "additionalTab" && (
            <>
              <Input
                result={result}
                value={formData.displayName}
                tab="additionalTab"
                name="displayName"
                label="Display Name"
                onChange={validateChange}
                onBlur={calculateMachineName}
              />
              <Input
                result={result}
                value={formData.machineName}
                tab="additionalTab"
                name="machineName"
                label="Machine Name"
                onChange={validateChange}
                sx={{
                  "& input": {
                    backgroundImage: loadingMachine
                      ? "url('https://powerusers.microsoft.com/t5/image/serverpage/image-id/118082i204C32E01666789C')"
                      : "",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "45px 45px",
                    backgroundPosition: "right",
                  },
                }}
              />
            </>
          )}
        </Box>
        <Box __css={{ textAlign: "right", mt: "10px" }}>
          <Box
            as="button"
            onClick={handleSubmit}
            __css={{
              bg: result.hasErrors() ? "error" : "valid",
              fontSize: "2xl",
              border: "0",
              borderRadius: "5px",
              px: "10px",
              py: "5px",
              color: "white",
              cursor: result.hasErrors() ? "not-allowed" : "pointer",
            }}
          >
            Submit
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
