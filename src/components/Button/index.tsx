import { ViewStyle } from "react-native"
import { Button as ButtonNativeBase, Text } from "native-base";

type props = {
    text: string
}

const rounded: ViewStyle = {
    borderRadius: 5
}

export default function Button({ text }: props) {
    return(
        <ButtonNativeBase
            size="sm"
            variant="outline"
            rounded={5}
            backgroundColor="purple.100"
            borderColor="purple.100"
            text={text}
        >
            <Text color="primary.100">{text}</Text>
        </ButtonNativeBase>
    )
}

