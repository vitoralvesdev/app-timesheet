import {Heading, HStack} from "native-base";
import {spacing} from "@/theme";
import React from "react";
import {ButtonBack} from "@/components/ButtonBack";
import {useNavigation} from "@react-navigation/native";

type props = {
    title: string
}

export const Header = ({ title }: props) => {
    const navigation = useNavigation()

    const goBack = () => {
        navigation.goBack()
    }

    return(
        <HStack>
            <ButtonBack onPress={goBack} />
            <HStack flex={1}  alignItems="center" justifyContent="center">
                <Heading fontSize={spacing.patterns.heading} color="gray.300">{title}</Heading>
            </HStack>
        </HStack>
    )
}
