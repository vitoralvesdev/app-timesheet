import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/models/helpers/withSetPropAction";
import { Authentication } from "@/models/Authentication";
import { User } from "@react-native-google-signin/google-signin";

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    idToken: "",
    name: "",
    photo: "",
    email: "",
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.idToken;
    },
    get isName() {
      return store.name;
    },
    get isPhoto() {
      return store.photo;
    },
    get isEmail() {
      return store.email;
    },
  }))
  .actions((store) => ({
    async signIn(res: User) {
      const { user } = res;

      store.setProp("idToken", res.idToken);
      store.setProp("name", user.name);
      store.setProp("photo", user.photo);
      store.setProp("email", user.email);
    },
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
