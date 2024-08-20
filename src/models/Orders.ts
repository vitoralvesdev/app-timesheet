import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export const Orders = types
  .model("Orders")
  .props({
    open: 0,
    finished: 0,
    items: "",
  })
  .actions(withSetPropAction);

export interface Orders extends Instance<typeof Orders> {}

export interface OrdersSnapshotOut extends SnapshotOut<typeof Orders> {}

export interface OrdersSnapshotIn extends SnapshotIn<typeof Orders> {}
