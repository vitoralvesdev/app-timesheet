import { Box, HStack, VStack } from "native-base";
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
import React, { useCallback, useState } from "react";
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
import { dateToText } from "@/helpers/formatDate";
import { rangeDate } from "@/helpers/rangeDate";

const HAS_HOME_MODAL = "APP_TIMESHEET_HAS_HOME_MODAL";

export const Home = observer(() => {
  const { loadingProgressStore } = useStores();

  const [error, setError] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
  const [modal, setModal] = useState(false);
  const [openOs, setOpenOs] = useState(0);
  const [finishedOs, setFinishedOs] = useState(0);

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

      const promises = statuses.map(async (status) => {
        const params: OrdersQuantityRequest = {
          ...rangeDate(OrdersGroupingPeriodEnum.YEARLY),
          groupingPeriod: OrdersGroupingPeriodEnum.DAILY,
          status,
        };

        return await ordersApi.getOrdersQuantity({ ...params });
      });

      const responses = await Promise.all(promises);

      responses.forEach((response, index) => {
        if (response.kind !== KindEnum.OK) {
          const { message } = response;
          setError({ visible: true, message });
          return;
        }

        const { result } = response;
        const quantity = result[0]?.quantity || 0;

        if (
          statuses[index] === OrdersStatusEnum.OPEN ||
          statuses[index] === OrdersStatusEnum.PROGRESS
        ) {
          setOpenOs(quantity);
          return;
        }

        if (statuses[index] === OrdersStatusEnum.FINISHED) {
          setFinishedOs(quantity);
        }
      });
    } finally {
      loadingProgressStore.setIsBusy(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReadFromStorage().then();
      fetchData().then();
    }, []),
  );

  return (
    <>
      <Screen refreshing={false}>
        <Box flex={1} margin={5}>
          <VStack style={{ marginBottom: spacing.lg }}>
            <User />
          </VStack>

          <VStack style={{ marginBottom: spacing.md }}>
            <Filter />
          </VStack>

          <VStack>
            <Chart period={OrdersGroupingPeriodEnum.DAILY} />
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
    </>
  );
});
