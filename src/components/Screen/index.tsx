import { ScrollView, useSafeArea } from "native-base";
import React, { useCallback, useState } from "react";
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
  onRefresh: () => void | undefined;
}

export const Screen = ({ children, refreshing, onRefresh }: ScreenProps) => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  return (
    <GestureHandlerRootView style={$flex}>
      <ScrollView
        contentContainerStyle={$flex}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        {...safeAreaProps}
      >
        {children}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const $flex: ViewStyle = {
  flex: 1,
};
