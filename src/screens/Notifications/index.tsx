import React, { FC, useCallback, useState } from "react";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { Button, Header, NoContent, Screen } from "@/components";
import { spacing } from "@/theme";
import { TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import {
  KindEnum,
  OrderResponse,
  ordersApi,
  OrdersRequest,
  OrdersStatusEnum,
} from "@/services";
import { useStores } from "@/stores";
import { useFocusEffect } from "@react-navigation/native";
import {
  AppStackScreenProps,
  ContainerLayoutOsDetailsEnum,
} from "@/navigators/app.routes";

interface NotificationsProps extends AppStackScreenProps<"Notifications"> {}

export const Notifications: FC<NotificationsProps> = observer(
  function Notifications(_props) {
    const navigation = _props.navigation;
    const { ordersStore } = useStores();

    const { loadingProgressStore } = useStores();

    const [notifications, setNotifications] = useState([]);

    const goOsDetails = (item: OrderResponse) => {
      ordersStore.setProp("id", item.id);

      navigation.navigate("OsDetails", {
        containerLayout: ContainerLayoutOsDetailsEnum.Finish,
      });
    };

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

          const openedItems = result.items.filter(
            (item) => item.status === OrdersStatusEnum.PROGRESS,
          );

          setNotifications(openedItems);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    useFocusEffect(
      useCallback(() => {
        fetchData().then();
      }, []),
    );

    return (
      <Screen refreshing={false}>
        <VStack margin={5} style={{ marginBottom: spacing.md }}>
          <Header title="Notificações" />
        </VStack>

        <VStack alignSelf="center" marginY={spacing.xxs}>
          <Text color="gray.400">
            Existem tarefas que precisam ser finalizadas.
          </Text>
        </VStack>

        <ScrollView>
          {notifications.map((item, index) => (
            <TouchableOpacity key={index}>
              <VStack borderBottomWidth={1} borderBottomColor="purple.300">
                <Box marginY={4}>
                  <HStack marginX={5}>
                    {item.companyName ? (
                      <>
                        <Text
                          flex={1}
                          color="gray.500"
                          fontSize={spacing.patterns.text}
                          fontWeight="bold"
                        >
                          {item.companyName}
                        </Text>
                        <Text color="gray.100">
                          {item.totalHours.hours}h {item.totalHours.minutes}m
                        </Text>
                      </>
                    ) : null}
                  </HStack>

                  <VStack marginX={5}>
                    <HStack marginY={2}>
                      <Text flex={1} color="gray.500" numberOfLines={2}>
                        {item.serviceDescription}
                      </Text>

                      {!item.companyName ? (
                        <Text color="gray.100">
                          {item.totalHours.hours}h {item.totalHours.minutes}m
                        </Text>
                      ) : null}
                    </HStack>

                    {item.status === OrdersStatusEnum.PROGRESS ? (
                      <VStack width={"25%"}>
                        <Button
                          text="Finalizar"
                          onPress={() => goOsDetails(item)}
                        />
                      </VStack>
                    ) : null}
                  </VStack>
                </Box>
              </VStack>
            </TouchableOpacity>
          ))}

          {notifications.length === 0 && (
            <NoContent
              title="Ops"
              description={`Nenhuma notificação encontrada.`}
            />
          )}
        </ScrollView>
      </Screen>
    );
  },
);
