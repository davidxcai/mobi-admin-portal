import { validateInput } from "./validateUtils";

export type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export const loginData = {
  mode: "uncontrolled", // component isn't re-rendered everytime you enter a character
  initialValues: {
    username: "",
    password: "",
    remember: false,
  },
  validate: {
    username: validateInput,
    password: validateInput,
  },
};
