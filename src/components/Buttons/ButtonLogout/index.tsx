import { TouchableOpacity } from "react-native";
import { Box } from "native-base";
import Ionicons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { THEME } from "@/theme";

type props = {
  onPress: () => void;
};

export const ButtonLogout = ({ onPress }: props) => {
  return (
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
        <Ionicons color={THEME.colors.purple[700]} name="logout" size={22} />
      </Box>
    </TouchableOpacity>
  );
};
