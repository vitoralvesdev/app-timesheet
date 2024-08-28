import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";

export const PushStoreModel = types
  .model("PushStore")
  .props({
    token: "",
  })
  .actions(withSetPropAction);

export interface PushStore extends Instance<typeof PushStoreModel> {}

export interface PushStoreSnapshotOut
  extends SnapshotOut<typeof PushStoreModel> {}

export interface PushStoreSnapshotIn
  extends SnapshotIn<typeof PushStoreModel> {}
