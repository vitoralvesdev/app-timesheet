import { Box, HStack, useSafeArea, VStack } from "native-base";
import { Button, Card, Chart, Filter, HomeModal, User } from "@/components";
import { spacing } from "@/theme";
import { DownloadSvg, UploadSvg } from "@/svg";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStores } from "@/models";
import { observer } from "mobx-react-lite";

const HAS_HOME_MODAL = "APP_TIMESHEET_HAS_HOME_MODAL";

export const Home = observer(() => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  const {
    ordersStore: {
      fetchFinishOSQuantity,
      fetchOpenOSQuantity,
      getFinishOSQuantity,
      getOpenOSQuantity,
    },
  } = useStores();

  const [modal, setModal] = useState(false);

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
    await fetchFinishOSQuantity();
  };

  useEffect(() => {
    getReadFromStorage().then();
    fetchData().then();
  }, []);

  return (
    <Box flex={1} margin={5} {...safeAreaProps}>
      <Button text="refresh" onPress={fetchData} />
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
          quantity={getFinishOSQuantity}
          title="OS Fechadas"
        />
      </HStack>

      <HomeModal visible={modal} closeCallback={onCloseModal} />
    </Box>
  );
});
