import React from "react";
import { Text } from "native-base";
import { spacing, THEME } from "@/theme";
import {
  Modal,
  ModalProps,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Button } from "@/components";
import { SuccessSvg } from "@/svg";
import { ErrorSvg } from "@/svg/ErrorSvg";

export interface CustomModalProps extends ModalProps {
  title?: string;
  description: string;
  preset: "success" | "error";
  closeCallback?: TouchableOpacityProps["onPress"];
  cancelCallback?: TouchableOpacityProps["onPress"];
}

export const CustomModal = (props: CustomModalProps) => {
  const { title, description, preset, closeCallback, cancelCallback, ...rest } =
    props;

  const renderSuccess = () => {
    return (
      <>
        <SuccessSvg />

        <View>
          {title ? (
            <Text fontSize={spacing.lg} style={$textCenter}>
              {title}
            </Text>
          ) : null}

          <Text color="gray.100" fontSize={spacing.md} style={$textCenter}>
            {description}
          </Text>
        </View>

        {closeCallback && <Button text="Continuar" onPress={closeCallback} />}
      </>
    );
  };
  const renderError = () => {
    return (
      <>
        <ErrorSvg />

        <View>
          {title ? (
            <Text fontSize={spacing.lg} style={$textCenter}>
              {title}
            </Text>
          ) : null}

          <Text color="gray.100" fontSize={spacing.md} style={$textCenter}>
            {description}
          </Text>
        </View>
        {closeCallback && (
          <Button text="Tentar Novamente" onPress={closeCallback} />
        )}
        <Button text="Cancelar" preset="error" onPress={cancelCallback} />
      </>
    );
  };

  return (
    <Modal transparent={true} {...rest}>
      <View style={$backdropContainer}>
        <View style={$modalContainer}>
          {preset === "success" ? renderSuccess() : null}
          {preset === "error" ? renderError() : null}
        </View>
      </View>
    </Modal>
  );
};

const $backdropContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(44,44,44,0.7)",
};

const $modalContainer: ViewStyle = {
  minWidth: 280,
  maxWidth: 320,
  backgroundColor: THEME.colors.primary[200],
  borderRadius: 16,
  paddingHorizontal: spacing.xxxl,
  paddingVertical: spacing.xl,
  gap: spacing.md,
  alignItems: "center",
  justifyContent: "center",
};

const $textCenter: TextStyle = {
  textAlign: "center",
};
