import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "@/stores/AuthenticationStore";
import { OrdersStoreModel } from "@/stores/OrdersStore";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  ordersStore: types.optional(OrdersStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
