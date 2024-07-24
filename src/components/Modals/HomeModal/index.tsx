import React, { useState } from "react";
import {
  Modal,
  ModalProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundCircleSvg, ManSvg } from "@/svg";
import { ButtonClose } from "@/components";

export interface HomeModalProps extends ModalProps {
  closeCallback?: TouchableOpacityProps["onPress"];
  cancelCallback?: TouchableOpacityProps["onPress"];
}

const PAGES = 3;

export const HomeModal = (props: HomeModalProps) => {
  const { closeCallback, cancelCallback, ...rest } = props;

  const [currentPage, setCurrentPage] = useState(0);

  const renderBackground = () => {
    return (
      <>
        <Box position="absolute" bottom={0} zIndex={-99}>
          <BackgroundCircleSvg />
        </Box>

        <Box position="absolute" left={5} bottom={0} zIndex={-99}>
          <ManSvg />
        </Box>
      </>
    );
  };

  return (
    <>
      {/*<StatusBar barStyle="light-content" />*/}

      <Modal animationType={"slide"} {...rest}>
        <LinearGradient colors={THEME.colors.linearGradientBg} style={$flex}>
          <View style={$containerStyle}>
            <View style={$flex}>
              <Box
                mt={spacing.xxs}
                paddingX={spacing.xxs}
                flexDirection="row"
                justifyContent="flex-end"
              >
                <ButtonClose
                  onPress={closeCallback}
                  color={THEME.colors.primary[200]}
                />
              </Box>

              <PagerView
                style={$flex}
                initialPage={currentPage}
                onPageSelected={(event) =>
                  setCurrentPage(event.nativeEvent.position)
                }
              >
                <View style={$page} key="1">
                  <Box paddingX={spacing.xxs}>
                    <Text
                      mt={spacing.xs}
                      color="primary.200"
                      fontSize={spacing.xl}
                      bold
                      lineHeight={spacing.xl}
                    >
                      Seu controle de horas de forma efetiva
                    </Text>

                    <Text mt={spacing.xxs} color="gray.400">
                      Faça o apontamento de horas das suas ordens de serviço de
                      forma efetiva
                    </Text>
                  </Box>
                </View>

                <View style={$page} key="2">
                  <Box paddingX={spacing.xxs}>
                    <Text
                      mt={spacing.xs}
                      color="primary.200"
                      fontSize={spacing.xl}
                      bold
                      lineHeight={spacing.xl}
                    >
                      Tudo na palma da mão
                    </Text>

                    <Text mt={spacing.xxs} color="gray.400">
                      Através do seu celular, faça o apontamento das horas sem
                      perder tempo
                    </Text>
                  </Box>
                </View>

                <View style={$page} key="3">
                  <Box paddingX={spacing.xxs}>
                    <Text
                      mt={spacing.xs}
                      color="primary.200"
                      fontSize={spacing.xl}
                      bold
                      lineHeight={spacing.xl}
                    >
                      Otimize seu tempo
                    </Text>

                    <Text mt={spacing.xxs} color="gray.400">
                      Antes mesmo de sair do cliente, feche sua ordem de serviço
                      e aponta suas horas gastas
                    </Text>
                  </Box>
                </View>
              </PagerView>
            </View>

            <View style={$options}>
              {[...Array(PAGES)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[$pointer, currentPage === index && $activePointer]}
                  onPress={() => setCurrentPage(index)}
                />
              ))}
            </View>

            {renderBackground()}
          </View>
        </LinearGradient>
      </Modal>
    </>
  );
};

const $activePointer: ViewStyle = {
  backgroundColor: THEME.colors.primary[200],
  opacity: 1,
};

const $pointer: ViewStyle = {
  width: 10,
  height: 10,
  opacity: 0.5,
  borderRadius: spacing.xs,
  backgroundColor: THEME.colors.gray[200],
};

const $options: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  gap: spacing.xs,
  marginVertical: spacing.xl,
};

const $containerStyle: ViewStyle = {
  backgroundColor: THEME.colors.transparent,
  flex: 1,
  marginTop: spacing.xl,
};

const $flex: ViewStyle = {
  flex: 1,
};

const $page: ViewStyle = {
  alignItems: "center",
};
