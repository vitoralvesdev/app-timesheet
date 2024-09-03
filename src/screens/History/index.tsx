import { Agenda, Screen } from "@/components";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useState } from "react";
import { KindEnum, ordersApi, OrdersRequest } from "@/services";
import { useFocusEffect } from "@react-navigation/native";
import {
  AppStackScreenProps,
  ContainerLayoutOsDetailsEnum,
} from "@/navigators/app.routes";
import { useStores } from "@/stores";
import { DateData } from "react-native-calendars";

interface HistoryProps extends AppStackScreenProps<"History"> {}

export const History: FC<HistoryProps> = observer(function History(_props) {
  const navigation = _props.navigation;
  const { ordersStore, loadingProgressStore } = useStores();

  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      loadingProgressStore.setIsBusy(true);

      const params: OrdersRequest = {
        page: 1,
        pageSize: 10,
      };

      const response = await ordersApi.getOrders({ ...params });

      if (response.kind === KindEnum.OK) {
        const { result } = response;

        setOrders(result.items);
      }
    } finally {
      loadingProgressStore.setIsBusy(false);
    }
  };

  const goOsDetails = (data: DateData) => {
    ordersStore.setProp("id", "");

    navigation.navigate("OsDetails", {
      containerLayout: ContainerLayoutOsDetailsEnum.Create,
      schedulingDate: data.dateString,
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData().then();
    }, []),
  );

  return (
    <Screen refreshing={false}>
      <Agenda data={orders} onDayPress={(v) => goOsDetails(v)} />
    </Screen>
  );
});
