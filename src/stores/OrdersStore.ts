import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";
import {
  KindEnum,
  ordersApi,
  OrdersGroupingPeriodEnum,
  OrdersQuantityRequest,
  OrdersStatusEnum,
} from "@/services";
import { dateToText } from "@/helpers/formatDate";

export const OrdersStoreModel = types
  .model("OrdersStore")
  .props({
    id: "",
    open: 0,
    finished: 0,
    selectedDay: "",
    recordedLatitude: 0,
    recordedLongitude: 0,
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get getOpenOSQuantity() {
      return store.open;
    },
    get getFinishedOSQuantity() {
      return store.finished;
    },
  }))
  .actions((store) => ({
    async fetchOpenOSQuantity() {
      const params: OrdersQuantityRequest = {
        startDate: dateToText(new Date().toString(), "yyyy-MM-dd"),
        endDate: dateToText(new Date().toString(), "yyyy-MM-dd"),
        groupingPeriod: OrdersGroupingPeriodEnum.DAILY,
        status: OrdersStatusEnum.OPEN,
      };

      const response = await ordersApi.getOrdersQuantity({ ...params });

      if (response.kind === KindEnum.OK) {
        const { result } = response;

        store.setProp("open", result[0]?.quantity);
      }
    },

    async fetchFinishedOSQuantity() {
      const params: OrdersQuantityRequest = {
        startDate: dateToText(new Date().toString(), "yyyy-MM-dd"),
        endDate: dateToText(new Date().toString(), "yyyy-MM-dd"),
        groupingPeriod: OrdersGroupingPeriodEnum.DAILY,
        status: OrdersStatusEnum.FINISHED,
      };

      const response = await ordersApi.getOrdersQuantity({ ...params });

      if (response.kind === KindEnum.OK) {
        const { result } = response;

        store.setProp("finished", result[0]?.quantity);
      }
    },
  }));

export interface OrdersStore extends Instance<typeof OrdersStoreModel> {}

export interface OrdersStoreSnapshotOut
  extends SnapshotOut<typeof OrdersStoreModel> {}

export interface OrdersStoreSnapshotIn
  extends SnapshotIn<typeof OrdersStoreModel> {}
