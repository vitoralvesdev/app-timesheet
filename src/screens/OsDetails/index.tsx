import { VStack, Text, Box, HStack } from "native-base";
import { spacing } from "@/theme";
import {
  Button,
  ButtonBack,
  Clock,
  CustomModal,
  Header,
  TextField,
  Screen,
  CurrentDate,
} from "@/components";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import React, { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KindEnum, OrderRequest, ordersApi, OrdersRequest } from "@/services";
import { observer } from "mobx-react-lite";

interface IFormValues {
  companyName: string;
  serviceDescription: string;
}

export enum ContainerLayoutOsDetailsEnum {
  Create = 0,
  Start = 1,
  Finish = 2,
}

export const OsDetails = observer(() => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { containerLayout } = route.params;

  const [osStarted, setOsStarted] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { control, getValues } = useForm<IFormValues>({
    mode: "onChange",
  });

  const containerLayoutCreate = () => {
    return (
      <>
        <VStack marginX={5} marginY={5}>
          <Header
            title="Nova OS"
            renderButtonBack={() => <ButtonBack onPress={goHistory} />}
          />
        </VStack>

        <VStack marginX={5}>
          <Text
            mb={spacing.xxs}
            color="gray.500"
            fontSize={spacing.patterns.text}
            fontWeight="bold"
          >
            Nome
          </Text>

          <HStack mb={spacing.xs}>
            <Controller
              name="companyName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField value={value} onChange={(v) => onChange(v)} />
              )}
            />
          </HStack>
        </VStack>

        <VStack marginX={5}>
          <Text
            mb={spacing.xxs}
            color="gray.500"
            fontSize={spacing.patterns.text}
            fontWeight="bold"
          >
            Data
          </Text>

          <HStack mb={spacing.xs}>
            <CurrentDate />
          </HStack>
        </VStack>

        <VStack marginX={5}>
          <Text
            mb={spacing.xxs}
            color="gray.500"
            fontSize={spacing.patterns.text}
            fontWeight="bold"
          >
            Observação
          </Text>

          <HStack mb={spacing.xs}>
            <Controller
              name="serviceDescription"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder="Problema resolvido"
                  value={value}
                  onChange={(v) => onChange(v)}
                  numberOfLines={3}
                />
              )}
            />
          </HStack>
        </VStack>
        <VStack marginX={5}>
          <Text
            mb={spacing.xxs}
            color="gray.500"
            fontSize={spacing.patterns.text}
            fontWeight="bold"
          >
            Horário
          </Text>
        </VStack>

        <VStack marginX={5}>
          <Button text="Criar OS" onPress={() => createOS().then()} />
        </VStack>
      </>
    );
  };

  const containerLayoutStart = () => {
    return (
      <>
        <VStack marginX={5} marginY={5}>
          <Header
            title="Iniciar OS"
            renderButtonBack={() => <ButtonBack onPress={goHistory} />}
          />
        </VStack>

        <VStack marginX={5}>
          <VStack mb={spacing.xs}>
            <Clock />
          </VStack>
          <Button text="Iniciar OS" onPress={() => setSuccess(true)} />
        </VStack>
      </>
    );
  };

  const containerLayoutFinish = () => {
    return <Button text="Finalizar OS" onPress={() => setSuccess(true)} />;
  };

  const goHistory = () => {
    navigation.navigate("History");
  };

  const createOS = async () => {
    const params: OrderRequest = {
      serviceDescription: getValues("serviceDescription"),
      companyName: getValues("companyName"),
      companyAddressLatitude: -22.897140306896276,
      companyAddressLongitude: -47.06153484719727,
      schedulingDate: "2024-08-23",
    };

    const response = await ordersApi.createOrder({ ...params });

    if (response.kind !== KindEnum.OK) {
      setError(!error);
    }

    if (response.kind === KindEnum.OK) {
      const { result } = response;

      console.log("result", result);

      setSuccess(!success);
    }
  };

  return (
    <Screen refreshing={false}>
      <VStack flex={1}>
        {ContainerLayoutOsDetailsEnum.Create === containerLayout
          ? containerLayoutCreate()
          : null}
        {ContainerLayoutOsDetailsEnum.Start === containerLayout
          ? containerLayoutStart()
          : null}
        {ContainerLayoutOsDetailsEnum.Finish === containerLayout
          ? containerLayoutFinish()
          : null}
      </VStack>

      <CustomModal
        visible={success}
        description="Apontamento efetuado"
        preset="success"
        closeCallback={goHistory}
      />

      <CustomModal
        visible={error}
        description="Houve um erro ao cadastrar a OS"
        preset="error"
        closeCallback={() => createOS().then()}
        cancelCallback={() => setError(!error)}
      />
    </Screen>
  );
});
