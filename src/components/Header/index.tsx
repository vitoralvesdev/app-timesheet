import {Heading, HStack} from "native-base";
import {spacing} from "@/theme";
import React from "react";
import {ButtonBack} from "@/components/ButtonBack";
import {useNavigation} from "@react-navigation/native";

type props = {
    title: string,
    renderButtonBack?: () => React.JSX.Element | null
}

export const Header = ({ title, renderButtonBack }: props) => {
    const navigation = useNavigation()

    const goBack = () => {
        navigation.goBack()
    }

    return(
        <HStack>
            {!renderButtonBack ? (
                <ButtonBack onPress={goBack} />
            ) : renderButtonBack()}

            <HStack flex={1}  alignItems="center" justifyContent="center">
                <Heading fontSize={spacing.patterns.heading} color="gray.300">{title}</Heading>
            </HStack>
        </HStack>
    )
}
