import { HStack, ScrollView, Text, VStack } from "native-base";
import { spacing } from "@/theme";
import {
  Chip,
  Header,
  NoContent,
  Screen,
  TextField,
  ToggleGroup,
} from "@/components";
import { Controller, useForm } from "react-hook-form";
import { SearchSvg } from "@/svg";
import { FC, useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { useFocusEffect } from "@react-navigation/native";
import {
  AppStackScreenProps,
  ContainerLayoutOsDetailsEnum,
} from "@/navigators/app.routes";
import {
  KindEnum,
  OrderResponse,
  ordersApi,
  OrdersRequest,
  OrdersStatusEnum,
} from "@/services";
import { useStores } from "@/stores";

type OrderProps = {
  companyName: string;
  serviceDescription: string;
  status: string;
};

interface IFormValues {
  search: string;
}

export enum StatusEnum {
  All = "ALL",
  Open = "OPEN",
  Progress = "IN_PROGRESS",
}

export const StatusLabel = new Map([
  ["ALL", "Todas"],
  ["OPEN", "Aberta"],
  ["IN_PROGRESS", "Andamento"],
]);

interface OsProps extends AppStackScreenProps<"OsDetails"> {}

export const Os: FC<OsProps> = observer(function Os(_props) {
  const navigation = _props.navigation;
  const { ordersStore, loadingProgressStore } = useStores();

  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(
    StatusLabel.get(StatusEnum.All) as string,
  );
  const [orders, setOrders] = useState([]);

  const { control } = useForm<IFormValues>({
    mode: "onChange",
  });

  const filterStatus = (item: OrderProps) => {
    const { status } = item;

    if (toggle === StatusLabel.get(StatusEnum.All)) {
      return true;
    }

    return (
      (toggle === StatusLabel.get(StatusEnum.Open) &&
        status === StatusEnum.Open) ||
      (toggle === StatusLabel.get(StatusEnum.Progress) &&
        status === StatusEnum.Progress)
    );
  };

  const filterItems = (item: OrderProps) => {
    if (!search) {
      return item;
    }

    return (
      item.companyName.toLowerCase().includes(search.toLowerCase()) ||
      item.serviceDescription.toLowerCase().includes(search.toLowerCase())
    );
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

        const finishedItems = result.items.filter(
          (item) => item.status !== OrdersStatusEnum.FINISHED,
        );

        setOrders(finishedItems);
      }
    } finally {
      loadingProgressStore.setIsBusy(false);
    }
  };

  const goOsDetails = (item: OrderResponse) => {
    ordersStore.setProp("id", item.id);

    if (item.status === OrdersStatusEnum.OPEN) {
      navigation.navigate("OsDetails", {
        containerLayout: ContainerLayoutOsDetailsEnum.Start,
      });
    }

    if (item.status === OrdersStatusEnum.PROGRESS) {
      navigation.navigate("OsDetails", {
        containerLayout: ContainerLayoutOsDetailsEnum.Finish,
      });
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData().then();
    }, []),
  );

  return (
    <Screen refreshing={false}>
      <VStack flex={1}>
        <VStack margin={5} style={{ marginBottom: spacing.md }}>
          <Header title="OS" renderButtonBack={() => null} />
        </VStack>

        <HStack marginX={5} marginBottom={4}>
          <Controller
            name="search"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                leftIcon={<SearchSvg />}
                placeholder="Buscar..."
                value={value}
                onChange={(v) => {
                  onChange(v);
                  setSearch(v);
                }}
              />
            )}
          />
        </HStack>

        <HStack marginX={5}>
          <ToggleGroup
            items={Array.from(StatusLabel.values())}
            onChange={(v) => setToggle(v)}
          />
        </HStack>

        {orders.length === 0 ? (
          <VStack marginY={spacing.lg}>
            <NoContent
              title="Ops"
              description="Parece que não existe nenhuma OS cadastrada."
              onPress={() => goOsDetails()}
            />
          </VStack>
        ) : null}

        {orders ? (
          <ScrollView>
            {orders
              .filter((item) => filterStatus(item))
              .filter((item) => filterItems(item))
              .map((item, index) => (
                <TouchableOpacity key={index} onPress={() => goOsDetails(item)}>
                  <HStack
                    alignItems="center"
                    justifyContent="center"
                    borderBottomWidth={1}
                    borderBottomColor="primary.400"
                    paddingY={25}
                  >
                    <VStack flex={1} marginX={5}>
                      <Text
                        flex={1}
                        color="gray.500"
                        fontSize={spacing.patterns.text}
                        fontWeight="bold"
                      >
                        {item.companyName}
                      </Text>
                      <Text color="gray.100">{item.serviceDescription}</Text>
                    </VStack>

                    <VStack marginX={5}>
                      <Chip
                        title={StatusLabel.get(item.status) as string}
                        preset={
                          item.status === StatusEnum.Progress
                            ? "active"
                            : "default"
                        }
                      />
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : null}
      </VStack>
    </Screen>
  );
});
