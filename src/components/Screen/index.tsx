import { Box, ScrollView, useSafeArea } from "native-base";
import React from "react";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { ViewStyle } from "react-native";

interface ScreenProps {
  /**
   * Children components.
   */
  children: React.ReactNode;

  /**
   * Whether the view should be indicating an active refresh.
   */
  refreshing: boolean;

  /**
   * Called when the view starts refreshing.
   */
  onRefresh?: () => () => Promise<void>;
}

export const Screen = ({ children, refreshing, onRefresh }: ScreenProps) => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  return (
    <GestureHandlerRootView style={$flex}>
      {onRefresh ? (
        <ScrollView
          contentContainerStyle={$flex}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          {...safeAreaProps}
        >
          {children}
        </ScrollView>
      ) : null}

      {!onRefresh ? (
        <Box flex={1} {...safeAreaProps}>
          {children}
        </Box>
      ) : null}
    </GestureHandlerRootView>
  );
};

const $flex: ViewStyle = {
  flex: 1,
};
