import vest, { test, enforce } from "vest";

const val = vest.create("myform", data => {
  test("username", "Must be between 5 and 16 characters", data => {
    enforce(data.username)
      .longerThanOrEquals(5)
      .shorterThanOrEquals(16);
  });

  test(
    "username",
    "Must only contain alphanumeric characters and underscores",
    data => {
      enforce(data.username).notMatches(/\W/);
    }
  );

  test("password", "Must be 8 characters or longer", data => {
    enforce(data.password).longerThanOrEquals(8);
  });

  test("password", "Must contain at least 1 number", data => {
    enforce(data.password).matches(/\d/);
  });

  test("password", "Must contain at least 1 letter", data => {
    enforce(data.password).matches(/[a-z]|[A-Z]/);
  });

  test("password", "Must contain at least 1 special character", data => {
    enforce(data.password).matches(/\W|_/);
  });
});

const validationResult = val();
