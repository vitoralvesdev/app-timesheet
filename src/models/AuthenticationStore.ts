import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/models/helpers/withSetPropAction";
import { AuthenticationModel } from "@/models/Authentication";

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authProperties: types.maybe(AuthenticationModel),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authProperties;
    },
  }))
  .actions((store) => ({
    signIn(res: any) {
      const { user } = res;
      const authProperties = AuthenticationModel.create({
        idToken: res.idToken,
        name: user.name,
        photo: user.photo,
        email: user.email,
      });

      console.log("authProperties", authProperties);

      store.setProp("authProperties", authProperties);
    },
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
