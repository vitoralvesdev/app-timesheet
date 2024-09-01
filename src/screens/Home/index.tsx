import React, { useCallback, useState } from "react";
import { Box, HStack, ScrollView, VStack } from "native-base";
import {
  Card,
  Chart,
  Filter,
  HomeModal,
  User,
  Screen,
  CustomModal,
} from "@/components";
import { spacing } from "@/theme";
import { DownloadSvg, UploadSvg } from "@/svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStores } from "src/stores";
import { observer } from "mobx-react-lite";
import { useFocusEffect } from "@react-navigation/native";
import {
  KindEnum,
  ordersApi,
  OrdersGroupingPeriodEnum,
  OrdersQuantityRequest,
  OrdersStatusEnum,
} from "@/services";
import { rangeDate } from "@/helpers/rangeDate";
import { useNotify } from "@/components/Notify";

const HAS_HOME_MODAL = "APP_TIMESHEET_HAS_HOME_MODAL";

export const Home = observer(() => {
  const { loadingProgressStore } = useStores();
  const sendPushNotification = useNotify();

  const [error, setError] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
  const [modal, setModal] = useState(false);
  const [openOs, setOpenOs] = useState(0);
  const [progressOs, setProgressOs] = useState(0);
  const [finishedOs, setFinishedOs] = useState(0);

  const [orderGroupingPeriod, setOrderGroupingPeriod] =
    useState<OrdersGroupingPeriodEnum>(OrdersGroupingPeriodEnum.DAILY);

  const onCloseModal = async () => {
    await setReadFromStorage();
  };

  const setReadFromStorage = async () => {
    try {
      await AsyncStorage.setItem(HAS_HOME_MODAL, "read");
      setModal(!modal);
    } catch (e) {
      console.error(e);
    }
  };

  const getReadFromStorage = async () => {
    const modal = await AsyncStorage.getItem(HAS_HOME_MODAL);

    if (!modal) {
      setModal(true);
    }
  };

  const fetchData = async () => {
    try {
      loadingProgressStore.setIsBusy(true);

      const statuses = [
        OrdersStatusEnum.OPEN,
        OrdersStatusEnum.PROGRESS,
        OrdersStatusEnum.FINISHED,
      ];

      const { startDate, endDate } = rangeDate(orderGroupingPeriod);

      const promises = statuses.map(async (status) => {
        const params: OrdersQuantityRequest = {
          startDate,
          endDate,
          groupingPeriod: orderGroupingPeriod,
          status,
        };

        return await ordersApi.getOrdersQuantity(params);
      });

      const responses = await Promise.all(promises);

      let openQuantity = 0;
      let progressQuantity = 0;
      let finishedQuantity = 0;

      responses.forEach((response, index) => {
        if (response.kind === KindEnum.OK) {
          const { result } = response;
          const quantity = result[0]?.quantity || 0;

          console.log("request==>", result);

          if (statuses[index] === OrdersStatusEnum.OPEN) {
            openQuantity = quantity;
          } else if (statuses[index] === OrdersStatusEnum.PROGRESS) {
            progressQuantity = quantity;
          } else if (statuses[index] === OrdersStatusEnum.FINISHED) {
            finishedQuantity = quantity;
          }
        }
      });

      setOpenOs(openQuantity);
      setProgressOs(progressQuantity);
      setFinishedOs(finishedQuantity);
    } finally {
      loadingProgressStore.setIsBusy(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReadFromStorage().then();
      fetchData().then();

      sendPushNotification({
        title: "teste",
        body: "teste",
      });
    }, [orderGroupingPeriod]),
  );

  return (
    <ScrollView>
      <Screen refreshing={false}>
        <Box flex={1} margin={5}>
          <VStack style={{ marginBottom: spacing.lg }}>
            <User />
          </VStack>

          <VStack style={{ marginBottom: spacing.md }}>
            <Filter
              onChange={(item) =>
                setOrderGroupingPeriod(item.key as OrdersGroupingPeriodEnum)
              }
            />
          </VStack>

          <VStack>
            <Chart
              openQuantity={openOs}
              progressQuantity={progressOs}
              finishedQuantity={finishedOs}
            />
          </VStack>

          <HStack style={{ gap: spacing.xs }}>
            <Card icon={<DownloadSvg />} quantity={openOs} title="OS Abertas" />
            <Card
              icon={<UploadSvg />}
              quantity={finishedOs}
              title="OS Fechadas"
            />
          </HStack>

          <HomeModal visible={modal} closeCallback={onCloseModal} />
        </Box>
      </Screen>

      <CustomModal
        visible={error.visible}
        description={error.message}
        preset="error"
        cancelCallback={() => setError({ visible: false, message: "" })}
      />
    </ScrollView>
  );
});
