import { Box } from "theme-ui";

const Input = ({
  label,
  tab,
  name,
  type,
  value,
  onBlur,
  onChange,
  result,
  hasTimeout,
  ...props
}) => {
  // get Errors & Warnings
  const errorMessages = result.getErrors(name);
  const warningMessages = result.getWarnings(name);

  const hasError = errorMessages.length > 0;
  const hasWarnings = warningMessages.length > 0;

  return (
    <Box as="label" __css={{ mt: "15px" }} {...props}>
      <Box __css={{ display: "flex", justifyContent: "space-between" }}>
        {label}
        {hasError && (
          <Box as="span" __css={{ color: "error" }}>
            {errorMessages[0]}
          </Box>
        )}
        {!hasError && hasWarnings && (
          <Box as="span" __css={{ color: "warning" }}>
            {warningMessages[0]}
          </Box>
        )}
      </Box>
      <Box
        as="input"
        autoComplete="off"
        type={type}
        name={name}
        value={value}
        __css={{
          width: "100%",
          lineHeight: "2",
          fontSize: "base",
          px: "10px",
          borderRadius: "5px",
          border: "1px solid",
          bg: "#f1f2f3",
          borderColor: hasError ? "error" : hasWarnings ? "warning" : "#cccccc",
          color: hasError ? "error" : hasWarnings ? "warning" : "",
        }}
        onChange={(e) => {
          const {
            target: { name, value },
          } = e;
          onChange(name, value);
        }}
        onBlur={onBlur}
      />
    </Box>
  );
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => {},
  onBlur: () => {},
};

export default Input;
