import {
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  StyleProp,
  Modal,
  View,
} from "react-native";
import {
  Button as ButtonNativeBase,
  CloseIcon,
  HStack,
  Icon,
  ScrollView,
  Text,
} from "native-base";
import React, { ReactElement, useState } from "react";
import { spacing, THEME } from "@/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { ArrowDownSvg } from "@/svg";

export interface ComboViewProps<T> {
  /**
   * An array to render strings lists.
   */
  data: T[];

  /**
   * An optional value to show for the text input
   */
  value: T;

  /**
   * A function to be called when the selected item
   */
  onChange: (value: T) => void;

  /**
   * Takes an item from data and renders it into the list. Typical usage:
   * ```
   * _renderItem = ({item}) => (
   *   <TouchableOpacity onPress={() => this._onPress(item)}>
   *     <Text>{item.title}</Text>
   *   </TouchableOpacity>
   * );
   */
  renderItem: (item: T) => ReactElement;

  /**
   * Takes a value from data and renders it into the value field. Typical usage:
   * ```
   * renderValue = ({item}) => (
   *   <TouchableOpacity onPress={() => this._onPress(item)}>
   *     <Text>{item.title}</Text>
   *   </TouchableOpacity>
   * );
   */
  renderValue: (value: T) => ReactElement;
}

export function ComboView<T>(props: ComboViewProps<T>) {
  const { data, value, onChange, renderItem, renderValue, ...rest } = props;

  const [modal, setModal] = useState(false);

  const itemsModal = () => {
    return (
      <Modal transparent={true} {...rest} style={{ flex: 1 }}>
        <View style={$modal}>
          <View style={$box}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModal(!modal)}
              style={$header}
            >
              <CloseIcon color="primary.500" />
            </TouchableOpacity>

            <ScrollView>
              {data.map((item, index) => (
                <TouchableOpacity
                  style={$item}
                  activeOpacity={0.5}
                  key={index}
                  onPress={() => {
                    onChange(item);
                    setModal(!modal);
                  }}
                >
                  {renderItem(item)}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ButtonNativeBase size="sm" variant="outline" style={$baseStyle} {...rest}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setModal(!modal)}>
        <HStack alignItems="center">
          <Text mr={2}>{renderValue(value)}</Text>

          <ArrowDownSvg onPress={() => setModal(!modal)} />
        </HStack>

        {modal ? itemsModal() : null}
      </TouchableOpacity>
    </ButtonNativeBase>
  );
}

const $baseStyle: ViewStyle = {
  backgroundColor: THEME.colors.purple[400],
  borderColor: THEME.colors.purple[400],
  borderRadius: 12,
};

const $modal: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: THEME.colors.modal,
};

const $box: ViewStyle = {
  backgroundColor: THEME.colors.primary[100],
  width: "90%",
  maxHeight: "70%",
  borderRadius: spacing.sm,
  shadowColor: THEME.colors.primary[500],
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const $item: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
  borderTopWidth: 1,
  borderTopColor: THEME.colors.gray[600],
};

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  backgroundColor: THEME.colors.gray[600],
  borderTopRightRadius: spacing.sm,
  borderTopLeftRadius: spacing.sm,
};
