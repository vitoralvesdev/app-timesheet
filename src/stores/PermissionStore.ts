import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";

export const PermissionStoreModel = types
  .model("PermissionStore")
  .props({
    notification: false,
  })
  .actions(withSetPropAction)
  .views((store) => ({}))
  .actions((store) => ({}));

export interface PermissionStore
  extends Instance<typeof PermissionStoreModel> {}

export interface PermissionStoreSnapshotOut
  extends SnapshotOut<typeof PermissionStoreModel> {}

export interface PermissionStoreSnapshotIn
  extends SnapshotIn<typeof PermissionStoreModel> {}
