import { HStack, ScrollView, Text, VStack } from "native-base";
import {
  Button,
  ButtonBack,
  Clock,
  CurrentDate,
  CustomModal,
  Header,
  TextField,
  Screen,
} from "@/components";
import { useFocusEffect } from "@react-navigation/native";
import {
  AppStackScreenProps,
  ContainerLayoutOsDetailsEnum,
} from "@/navigators/app.routes";
import React, { FC, useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KindEnum,
  OrderRequest,
  OrderResponse,
  ordersApi,
  OrderUpdateRequest,
} from "@/services";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores";
import { useNotify } from "@/components/Notify";
import { spacing } from "@/theme";
import { getTextFieldOnValidation } from "@/utils/validate";

interface IFormValues {
  companyName: string;
  serviceDescription: string;
  comment: string;
}

interface OsDetailsProps extends AppStackScreenProps<"OsDetails"> {}

export const OsDetails: FC<OsDetailsProps> = observer(
  function OsDetails(_props) {
    const navigation = _props.navigation;
    const { containerLayout, schedulingDate } = _props.route.params;

    const {
      authenticationStore: { isCurrentLocation },
      ordersStore,
      loadingProgressStore,
    } = useStores();
    const sendPushNotification = useNotify();

    const [startTime, setStartTime] = useState<Date>(null);
    const [endTime, setEndTime] = useState<Date>(null);
    const [order, setOrder] = useState<OrderResponse>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<{ visible: boolean; message: string }>({
      visible: false,
      message: "",
    });

    const {
      control,
      formState: { errors, isValid },
      handleSubmit,
    } = useForm<IFormValues>({
      mode: "onChange",
      defaultValues: {
        companyName: "",
        serviceDescription: "",
        comment: "",
      },
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
              <CurrentDate date={schedulingDate || ""} />
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
              onPress={handleSubmit(onSubmit)}
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
                  <TextField value={order?.companyName} isDisabled />
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
                    value={order?.serviceDescription}
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
                currentTime={order?.createdAt as Date}
                onChange={(time) => setStartTime(time)}
              />
            </VStack>
          </VStack>

          <VStack marginX={5}>
            <Button text="Iniciar OS" onPress={handleSubmit(onSubmit)} />
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
                  <TextField value={order?.companyName} isDisabled />
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
            <Button text="Finalizar OS" onPress={handleSubmit(onSubmit)} />
          </VStack>
        </>
      );
    };

    const goBack = () => {
      // if (ordersStore.selectedDay) {
      //   navigation.navigate("History");
      //   return;
      // }
      //

      navigation.navigate("Os");
    };

    const onSuccess = () => {
      setSuccess(!success);
      goBack();
    };

    const createOS = async (data: IFormValues) => {
      try {
        loadingProgressStore.setIsBusy(true);

        const params: OrderRequest = {
          companyName: data.companyName,
          serviceDescription: data.serviceDescription,
          companyAddressLatitude: isCurrentLocation.recordedLatitude,
          companyAddressLongitude: isCurrentLocation.recordedLongitude,
          schedulingDate: schedulingDate,
        };

        const response = await ordersApi.createOrder({ ...params });

        if (response.kind !== KindEnum.OK) {
          const { message } = response;

          setError({ visible: true, message });
        }

        if (response.kind === KindEnum.OK) {
          sendPushNotification({
            sound: "default",
            title: "Nova Ordem de Serviço",
            body: data.companyName,
          }).then();

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
          recordedLatitude: isCurrentLocation.recordedLatitude,
          recordedLongitude: isCurrentLocation.recordedLongitude,
        };

        const response = await ordersApi.startOrder(ordersStore.id, {
          ...params,
        });

        if (response.kind !== KindEnum.OK) {
          const { message } = response;

          setError({ visible: true, message });
        }

        if (response.kind === KindEnum.OK) {
          setSuccess(!success);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    const endOS = async (data: IFormValues) => {
      try {
        loadingProgressStore.setIsBusy(true);

        const params: OrderUpdateRequest = {
          endDatetime: endTime,
          comment: data.comment,
          recordedLatitude: isCurrentLocation.recordedLatitude,
          recordedLongitude: isCurrentLocation.recordedLongitude,
        };

        const response = await ordersApi.endOrder(ordersStore.id, {
          ...params,
        });

        if (response.kind !== KindEnum.OK) {
          const { message } = response;

          setError({ visible: true, message });
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
          setError({
            visible: true,
            message: "Erro ao carregar Ordem de Serviço",
          });
        }

        if (response.kind === KindEnum.OK) {
          const { result } = response;

          setOrder(result);
        }
      } finally {
        loadingProgressStore.setIsBusy(false);
      }
    };

    const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
      console.log("form==>", data);

      if (containerLayout === ContainerLayoutOsDetailsEnum.Create) {
        createOS(data).then();
        return;
      }

      if (containerLayout === ContainerLayoutOsDetailsEnum.Start) {
        startOS().then();
        return;
      }

      if (containerLayout === ContainerLayoutOsDetailsEnum.Finish) {
        endOS(data).then();
      }
    };

    useFocusEffect(
      useCallback(() => {
        if (containerLayout !== ContainerLayoutOsDetailsEnum.Create) {
          fetchData().then();
        }
      }, [containerLayout]),
    );

    return (
      <>
        <Screen refreshing={false}>
          <ScrollView>
            <VStack marginBottom={4} flex={1}>
              {containerLayout === ContainerLayoutOsDetailsEnum.Create
                ? containerLayoutCreate()
                : null}

              {containerLayout === ContainerLayoutOsDetailsEnum.Start
                ? containerLayoutStart()
                : null}

              {containerLayout === ContainerLayoutOsDetailsEnum.Finish
                ? containerLayoutFinish()
                : null}
            </VStack>
          </ScrollView>
        </Screen>

        <CustomModal
          visible={success}
          description="Apontamento efetuado"
          preset="success"
          closeCallback={onSuccess}
        />

        <CustomModal
          visible={error.visible}
          description={error.message}
          preset="error"
          cancelCallback={() => setError({ visible: false, message: "" })}
        />
      </>
    );
  },
);
