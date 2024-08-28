import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "@/stores/AuthenticationStore";
import { LoadingProgressModel } from "@/stores/LoadingProgressStore";
import { OrdersStoreModel } from "@/stores/OrdersStore";
import { PermissionStoreModel } from "@/stores/PermissionStore";
import { PushStoreModel } from "@/stores/PushStore";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  loadingProgressStore: types.optional(LoadingProgressModel, {}),
  ordersStore: types.optional(OrdersStoreModel, {}),
  permissionStore: types.optional(PermissionStoreModel, {}),
  pushStore: types.optional(PushStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
