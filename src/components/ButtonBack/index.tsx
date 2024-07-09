import { TouchableOpacity } from "react-native";
import {ArrowBackSvg} from "@/svg";
import {Box} from "native-base";

type props = {
    onPress: () => void
}

export const ButtonBack = ({ onPress }: props) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <Box
                alignItems="center"
                borderColor="gray.200"
                borderWidth={1}
                borderRadius="full"
                justifyContent="center"
                style={{
                    width: 48,
                    height: 48,
                }}
            >
                <ArrowBackSvg />
            </Box>
        </TouchableOpacity>
    )
}
