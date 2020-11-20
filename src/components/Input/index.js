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
  ...props
}) => {
  const errorMessages = tab
    ? result.getErrors(name)
    : result.getErrorsByGroup(tab, name);

  const hasError = errorMessages.length > 0;

  return (
    <Box as="label" {...props}>
      <Box __css={{ display: "flex", justifyContent: "space-between" }}>
        {label}
        {hasError && <span>{errorMessages[0]}</span>}
      </Box>
      <Box
        as="input"
        type={type}
        name={name}
        value={value}
        __css={{ width: "100%" }}
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
