import React, { useRef } from "react";
import { AlertDialog, HStack, Text, VStack } from "native-base";
import { ModalProps, TextStyle } from "react-native";
import { Button } from "@/components";
import { spacing } from "@/theme";

export interface AlertModalProps extends ModalProps {
  visible: boolean;
  title: string;
  subTitle: string;
  closeCallback: () => void;
  confirmCallback: () => void;
}

export const AlertModal = ({
  visible,
  title,
  subTitle,
  closeCallback,
  confirmCallback,
}: AlertModalProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={visible}
      onClose={closeCallback}
    >
      <AlertDialog.Content>
        <AlertDialog.Header style={$header}>{title}</AlertDialog.Header>
        <AlertDialog.Body style={$header}>{subTitle}</AlertDialog.Body>

        <HStack style={$footer}>
          <Button
            preset="google"
            text="Cancelar"
            ref={cancelRef}
            onPress={closeCallback}
          />

          <Button
            preset="google"
            text="Sair"
            colorScheme="red"
            onPress={confirmCallback}
            ml={3}
          />
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

const $header: TextStyle = {
  alignItems: "center",
};

const $footer: TextStyle = {
  padding: spacing.sm,
  alignSelf: "flex-end",
};
