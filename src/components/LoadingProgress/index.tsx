import React, { View, ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores";
import LottieView from "lottie-react-native";
import { THEME } from "@/theme/colors";

export const LoadingProgress = observer(() => {
  const { loadingProgressStore } = useStores();

  return (
    <>
      {loadingProgressStore.getIsBusy() && (
        <View style={$container}>
          <View style={$indicator}>
            <LottieView
              source={require("assets/lottie/loading.json")}
              style={$lottie}
              autoPlay
              loop
            />
          </View>
        </View>
      )}
    </>
  );
});

const $container: ViewStyle = {
  position: "absolute",
  alignSelf: "center",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const $indicator: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: THEME.colors.primary[300],
};

const $lottie: ViewStyle = {
  width: 100,
  height: 100,
};
