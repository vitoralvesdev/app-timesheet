import { Agenda, Screen } from "@/components";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { KindEnum, ordersApi, OrdersRequest } from "@/services";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import { useStores } from "@/stores";
import { DateData } from "react-native-calendars";

export const History = observer(() => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { ordersStore } = useStores();

  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const params: OrdersRequest = {
      page: 1,
      pageSize: 10,
    };

    const response = await ordersApi.getOrders({ ...params });

    if (response.kind === KindEnum.OK) {
      const { result } = response;

      setOrders(result.items);
    }
  };

  const goOsDetails = (data: DateData) => {
    ordersStore.setProp("id", "");
    ordersStore.setProp("selectedDay", data.dateString);

    navigation.navigate("OsDetails");
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <Screen refreshing={false}>
      <Agenda data={orders} onDayPress={(v) => goOsDetails(v)} />
    </Screen>
  );
});
