import { Box, HStack, useSafeArea, VStack } from "native-base";
import {
  Card,
  Chart,
  CustomModal,
  Filter,
  HomeModal,
  User,
} from "@/components";
import { spacing } from "@/theme";
import { DownloadSvg, UploadSvg } from "@/svg";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { healthApi, KindEnum } from "@/services";

const HAS_HOME_MODAL = "APP_TIMESHEET_HAS_HOME_MODAL";

export const Home = () => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  const [modal, setModal] = useState(false);
  const [readApi, setReadApi] = useState(false);
  const [error, setError] = useState(false);

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

  async function getHealthApi() {
    const response = await healthApi.getHealth();

    if (response.kind !== KindEnum.OK) {
      setError(true);
      return;
    }

    if (response.kind === KindEnum.OK) {
      setReadApi(!readApi);
    }
  }

  useEffect(() => {
    getReadFromStorage().then();
  }, []);

  useEffect(() => {
    getHealthApi().then();
  }, []);

  return (
    <Box flex={1} margin={5} {...safeAreaProps}>
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
        <Card icon={<DownloadSvg />} title="13" text="OS Abertas" />

        <Card icon={<UploadSvg />} title="24" text="OS Fechadas" />
      </HStack>

      <HomeModal visible={modal} closeCallback={onCloseModal} />

      <CustomModal
        visible={readApi}
        description="API OK"
        preset="success"
        closeCallback={() => setReadApi(!readApi)}
      />

      <CustomModal
        visible={error}
        description="Houve um erro ao se conectar com a API."
        preset="error"
        closeCallback={() => getHealthApi().then()}
        cancelCallback={() => setError(!error)}
      />
    </Box>
  );
};
