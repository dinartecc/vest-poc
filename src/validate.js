import vest, { test, enforce, group } from "vest";

let timer;

const machineNameCheck = (machineName) => {
  const names = ["field_hello", "field_vest", "field_bye"];
  clearTimeout(timer);
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      console.log("Api Call");
      names.includes(machineName) ? reject() : resolve();
    }, 1500);
  });
};

const val = vest.create("myform", (data, { field, tab }) => {
  vest.only(field);
  vest.only.group(tab);

  group("userTab", () => {
    test("username", "Required", () => {
      enforce(data.username).isNotEmpty();
    });

    test("username", "Must be between 5 and 16 characters", () => {
      enforce(data.username).longerThanOrEquals(5).shorterThanOrEquals(16);
    });

    test(
      "username",
      "Must only contain alphanumeric characters and underscores",
      () => {
        enforce(data.username).matches(/^\w+$/);
      }
    );

    test("password", "Required", () => {
      enforce(data.password).isNotEmpty();
    });

    test("password", "Must be 6 characters or longer", () => {
      enforce(data.password).longerThanOrEquals(6);
    });

    test("password", "Should contain at least 1 number", () => {
      vest.warn();
      enforce(data.password).matches(/\d/);
    });

    test("password", "Should contain at least 1 letter", () => {
      vest.warn();
      enforce(data.password).matches(/[a-z]|[A-Z]/);
    });

    test("password", "Should contain at least 1 special character", () => {
      vest.warn();
      enforce(data.password).matches(/\W|_/);
    });

    if (data.password) {
      test("confirmPassword", "Passwords shoud match", () => {
        enforce(data.confirmPassword).equals(data.password);
      });
    }
  });

  group("additionalTab", () => {
    test("displayName", "Required", () => {
      enforce(data.displayName).isNotEmpty();
    });

    test("machineName", "Required", () => {
      enforce(data.machineName).isNotEmpty();
    });

    test("machineName", "At least 5 characters", () => {
      enforce(data.machineName).longerThanOrEquals(5);
    });

    test(
      "machineName",
      "Must only contain alphanumeric characters and underscores",
      () => {
        enforce(data.machineName).matches(/^\w+$/);
      }
    );

    if (!vest.draft().hasErrors("machineName")) {
      test.memo(
        "machineName",
        "Machine name already exists",
        async () => {
          return await machineNameCheck(data.machineName);
        },
        [data.machineName]
      );
    }
  });
});

export default val;
