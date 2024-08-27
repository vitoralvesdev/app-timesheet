import { Agenda, Screen } from "@/components";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { KindEnum, ordersApi, OrdersRequest } from "@/services";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import { useStores } from "@/stores";
import { DateData } from "react-native-calendars";

export const History = observer(() => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
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
    ordersStore.setProp("selectedDay", data.dateString);

    navigation.navigate("OsDetails");
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
