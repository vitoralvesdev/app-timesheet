import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export const Authentication = types
  .model("Authentication")
  .props({
    idToken: "",
    name: "",
    photo: "",
    email: "",
  })
  .actions(withSetPropAction);

export interface Authentication extends Instance<typeof Authentication> {}

export interface AuthenticationSnapshotOut
  extends SnapshotOut<typeof Authentication> {}

export interface AuthenticationSnapshotIn
  extends SnapshotIn<typeof Authentication> {}
