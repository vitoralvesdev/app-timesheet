import { VStack, Text, HStack } from "native-base";
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
import { useFocusEffect } from "@react-navigation/native";
import { AppStackScreenProps } from "@/navigators/app.routes";
import React, { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KindEnum,
  OrderRequest,
  OrderResponse,
  ordersApi,
  OrderUpdateRequest,
} from "@/services";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores";
import { StatusEnum } from "@/screens/Os";
import { getTextFieldOnValidation } from "@/utils/validate";

interface IFormValues {
  companyName: string;
  serviceDescription: string;
  comment: string;
}

export enum ContainerLayoutOsDetailsEnum {
  Create = 0,
  Start = 1,
  Finish = 2,
}

interface OsDetailsProps extends AppStackScreenProps<"OsDetails"> {}

export const OsDetails: FC<OsDetailsProps> = observer(
  function OsDetails(_props) {
    const navigation = _props.navigation;
    const { ordersStore, loadingProgressStore } = useStores();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [containerLayout, setContainerLayout] =
      useState<ContainerLayoutOsDetailsEnum>(
        ContainerLayoutOsDetailsEnum.Create,
      );
    const [startTime, setStartTime] = useState<Date>(null);
    const [endTime, setEndTime] = useState<Date>(null);
    const [order, setOrder] = useState<OrderResponse>(null);

    const {
      control,
      formState: { errors, isValid },
      getValues,
    } = useForm<IFormValues>({
      mode: "onChange",
    });

    const containerLayoutCreate = () => {
      return (
        <>
          <VStack marginX={5} marginY={5}>
            <Header
              title="Nova OS"
              renderButtonBack={() => <ButtonBack onPress={goBack} />}
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={(v) => onChange(v)}
                    containerStyle={getTextFieldOnValidation(
                      errors.companyName,
                    )}
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
              Data
            </Text>

            <HStack mb={spacing.xs}>
              <CurrentDate date={ordersStore.selectedDay} />
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    placeholder="Problema resolvido"
                    value={value}
                    onChange={(v) => onChange(v)}
                    numberOfLines={3}
                    blurOnSubmit={true}
                    containerStyle={getTextFieldOnValidation(
                      errors.serviceDescription,
                    )}
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
            <Button
              text="Criar OS"
              onPress={() => createOS().then()}
              isDisabled={!isValid}
            />
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
              renderButtonBack={() => <ButtonBack onPress={goBack} />}
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
                render={() => (
                  <TextField value={order.companyName} isDisabled />
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
              Observação
            </Text>

            <HStack mb={spacing.xs}>
              <Controller
                name="serviceDescription"
                control={control}
                render={() => (
                  <TextField
                    placeholder="Problema resolvido"
                    value={order.serviceDescription}
                    numberOfLines={3}
                    blurOnSubmit={true}
                    isDisabled
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
              Hora
            </Text>

            <VStack mb={spacing.xs}>
              <Clock
                currentTime={order.createdAt}
                onChange={(time) => setStartTime(time)}
              />
            </VStack>
          </VStack>

          <VStack marginX={5}>
            <Button text="Iniciar OS" onPress={() => startOS().then()} />
          </VStack>
        </>
      );
    };

    const containerLayoutFinish = () => {
      return (
        <>
          <VStack marginX={5} marginY={5}>
            <Header
              title="Finalizar OS"
              renderButtonBack={() => <ButtonBack onPress={goBack} />}
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
                render={() => (
                  <TextField value={order.companyName} isDisabled />
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
              Observação
            </Text>

            <HStack mb={spacing.xs}>
              <Controller
                name="comment"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    placeholder="Ocorreu tudo conforme o esperado"
                    value={value}
                    numberOfLines={3}
                    onChange={(v) => onChange(v)}
                    blurOnSubmit={true}
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
              Hora
            </Text>

            <VStack mb={spacing.xs}>
              <Clock onChange={(time) => setEndTime(time)} />
            </VStack>
          </VStack>

          <VStack marginX={5}>
            <Button text="Finalizar OS" onPress={() => endOS().then()} />
          </VStack>
        </>
      );
    };

    const renderContainerLayout = () => {
      switch (containerLayout) {
        case ContainerLayoutOsDetailsEnum.Create:
          return containerLayoutCreate();
        case ContainerLayoutOsDetailsEnum.Start:
          return containerLayoutStart();
        case ContainerLayoutOsDetailsEnum.Finish:
          return containerLayoutFinish();
        default:
          return null;
      }
    };

    const goBack = () => {
      navigation.goBack();
    };

    const createOS = async () => {
      try {
        loadingProgressStore.setIsBusy(true);

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

          setSuccess(!success);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    const startOS = async () => {
      try {
        loadingProgressStore.setIsBusy(true);

        const params: OrderUpdateRequest = {
          startDatetime: startTime,
          recordedLatitude: -22.897140306896276,
          recordedLongitude: -47.06153484719727,
        };

        const response = await ordersApi.startOrder(ordersStore.id, {
          ...params,
        });

        if (response.kind !== KindEnum.OK) {
          setError(!error);
        }

        if (response.kind === KindEnum.OK) {
          setSuccess(!success);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    const endOS = async () => {
      try {
        loadingProgressStore.setIsBusy(true);

        const params: OrderUpdateRequest = {
          endDatetime: endTime,
          comment: getValues("comment"),
          recordedLatitude: -22.897140306896276,
          recordedLongitude: -47.06153484719727,
        };

        const response = await ordersApi.endOrder(ordersStore.id, {
          ...params,
        });

        if (response.kind !== KindEnum.OK) {
          setError(!error);
        }

        if (response.kind === KindEnum.OK) {
          setSuccess(!success);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    const fetchData = async () => {
      try {
        loadingProgressStore.setIsBusy(true);

        const params: OrderRequest = {
          id: ordersStore.id,
        };

        const response = await ordersApi.getOrder({ ...params });

        if (response.kind !== KindEnum.OK) {
          setContainerLayout(ContainerLayoutOsDetailsEnum.Create);
        }

        if (response.kind === KindEnum.OK) {
          const { result } = response;

          setOrder(result);

          switch (result.status) {
            case StatusEnum.Open:
              setContainerLayout(ContainerLayoutOsDetailsEnum.Start);
              break;
            case StatusEnum.Progress:
              setContainerLayout(ContainerLayoutOsDetailsEnum.Finish);
              break;
            default:
              setContainerLayout(ContainerLayoutOsDetailsEnum.Create);
              break;
          }
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
        <VStack flex={1}>{renderContainerLayout()}</VStack>

        <CustomModal
          visible={success}
          description="Apontamento efetuado"
          preset="success"
          closeCallback={goBack}
        />

        <CustomModal
          visible={error}
          description="Houve um erro ao cadastrar a OS"
          preset="error"
          cancelCallback={() => setError(!error)}
        />
      </Screen>
    );
  },
);
