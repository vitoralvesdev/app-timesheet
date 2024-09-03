import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";

export const LoadingProgressStoreModel = types
  .model("LoadingProgressStore")
  .props({
    busy: false,
  })
  .actions(withSetPropAction)
  .views((store) => ({
    getIsBusy() {
      return store.busy;
    },
  }))
  .actions((store) => ({
    setIsBusy(value: boolean) {
      store.busy = value;
    },
  }));

export interface LoadingProgressStore
  extends Instance<typeof LoadingProgressStoreModel> {}

export interface LoadingProgressStoreSnapshotOut
  extends SnapshotOut<typeof LoadingProgressStoreModel> {}

export interface LoadingProgressStoreSnapshotIn
  extends SnapshotIn<typeof LoadingProgressStoreModel> {}
