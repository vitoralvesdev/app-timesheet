import { types } from "mobx-state-tree";

export const AuthenticationModel = types.model("Authentication", {
  idToken: types.string,
  name: types.string,
  photo: types.string,
  email: types.string,
});
