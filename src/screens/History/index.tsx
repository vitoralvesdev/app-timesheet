import { Box, Text, useSafeArea, VStack } from "native-base";
import { Agenda } from "@/components";

export const History = () => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  return (
    <Box flex={1} {...safeAreaProps}>
      <Agenda />
    </Box>
  );
};
