import {useSafeArea, HStack, VStack, Text, ScrollView} from "native-base";
import {spacing} from "@/theme";
import {Chip, Header, TextField, ToggleGroup} from "@/components";
import { Controller, useForm } from "react-hook-form"
import {SearchSvg} from "@/svg";
import {useState} from "react";
import {TouchableOpacity} from "react-native";

type OsProps = {
    title: string,
    description: string,
    status: string,
}

const DATA: OsProps[] = [
    {
        title: "BHUT",
        description: "OS: 123456",
        status: "Abertas"
    },
    {
        title: "BHUT",
        description: "OS: 1234678",
        status: "Andamento"
    },
    {
        title: "Bepay",
        description: "OS: E467783",
        status: "Abertas"
    },
    {
        title: "Ambev",
        description: "OS: D234567",
        status: "Abertas"
    },
    {
        title: "99 Pay",
        description: "OS: B1256",
        status: "Abertas"
    },
]

interface IFormValues {
    search: string
}

export enum ToggleEnum {
    All = "Todas",
    Open = "Abertas",
    Progress = "Andamento",
}

export const Os = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true
    });

    const [search, setSearch] = useState("")
    const [toggle, setToggle] = useState("")

    const {
        control,
    } = useForm<IFormValues>({
        mode: "onChange",
    })

    const filterStatus = (item: OsProps) => {
        if (!toggle) {
            return item
        }

        const { status } = item

        return (
            toggle === ToggleEnum.All ||
            (toggle === ToggleEnum.Open && status === ToggleEnum.Open) ||
            (toggle === ToggleEnum.Progress && status === ToggleEnum.Progress)
        )
    }

    const filterItems = (item: OsProps) => {
        if (!search) {
            return item
        }

        return(
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        )
    }

    return(
        <VStack flex={1} {...safeAreaProps}>
            <VStack margin={5}  style={{ marginBottom: spacing.md }}>
                <Header
                    title="OS"
                    renderButtonBack={() => null}
                />
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
                                onChange(v)
                                setSearch(v)
                            }}
                        />
                    )}
                />
            </HStack>

            <HStack marginX={5}>
                <ToggleGroup
                    items={["Todas", "Abertas", "Andamento"]}
                    onChange={(v) => setToggle(v)}
                />
            </HStack>

            <ScrollView>
                { DATA
                    .filter((item) => filterStatus(item))
                    .filter((item) => filterItems(item))
                    .map((item, index) => (
                    <TouchableOpacity
                        key={index}
                    >
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
                                >{item.title}</Text>
                                <Text color="gray.100">{item.description}</Text>
                            </VStack>

                            <VStack marginX={5}>
                                <Chip
                                    title={item.status}
                                    preset={item.status === "Andamento" ? "active" : "default"}
                                />
                            </VStack>
                        </HStack>
                    </TouchableOpacity>
                )) }
            </ScrollView>
        </VStack>
    )
}

