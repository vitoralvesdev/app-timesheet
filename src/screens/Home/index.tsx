import { Box, HStack, VStack } from "native-base";
import {
  Button,
  Card,
  Chart,
  Filter,
  HomeModal,
  User,
  Screen,
} from "@/components";
import { spacing } from "@/theme";
import { DownloadSvg, UploadSvg } from "@/svg";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStores } from "@/models";
import { observer } from "mobx-react-lite";

const HAS_HOME_MODAL = "APP_TIMESHEET_HAS_HOME_MODAL";

export const Home = observer(() => {
  const {
    ordersStore: {
      fetchFinishedOSQuantity,
      fetchOpenOSQuantity,
      getFinishedOSQuantity,
      getOpenOSQuantity,
    },
  } = useStores();

  const [modal, setModal] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

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
    await fetchOpenOSQuantity();
    await fetchFinishedOSQuantity();
  };

  useEffect(() => {
    getReadFromStorage().then();
    fetchData().then();
  }, []);

  return (
    <Screen refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex={1} margin={5}>
        <VStack style={{ marginBottom: spacing.lg }}>
          <User />
        </VStack>

        <VStack style={{ marginBottom: spacing.md }}>
          <Filter />
        </VStack>

        <VStack>
          <Chart />
        </VStack>

        <HStack style={{ gap: spacing.xs }}>
          <Card
            icon={<DownloadSvg />}
            quantity={getOpenOSQuantity}
            title="OS Abertas"
          />

          <Card
            icon={<UploadSvg />}
            quantity={getFinishedOSQuantity}
            title="OS Fechadas"
          />
        </HStack>

        <HomeModal visible={modal} closeCallback={onCloseModal} />
      </Box>
    </Screen>
  );
});
