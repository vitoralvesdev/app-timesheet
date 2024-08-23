import { Agenda, Screen } from "@/components";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { KindEnum, ordersApi, OrdersRequest } from "@/services";

export const History = observer(() => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const params: OrdersRequest = {
      page: 1,
      pageSize: 10,
    };

    const response = await ordersApi.getOrders({ ...params });

    if (response.kind === KindEnum.OK) {
      const { result } = response;

      console.log(result);

      setOrders(result.items);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <Screen refreshing={false}>
      <Agenda data={orders} />
    </Screen>
  );
});
