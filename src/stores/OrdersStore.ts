import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";
import Geolocation from "@react-native-community/geolocation";

export const OrdersStoreModel = types
  .model("OrdersStore")
  .props({
    id: "",
    selectedDay: "",
  })
  .actions(withSetPropAction)
  .views((store) => ({}))
  .actions((store) => ({}));

export interface OrdersStore extends Instance<typeof OrdersStoreModel> {}

export interface OrdersStoreSnapshotOut
  extends SnapshotOut<typeof OrdersStoreModel> {}

export interface OrdersStoreSnapshotIn
  extends SnapshotIn<typeof OrdersStoreModel> {}
