import { Box, useSafeArea } from "native-base";
import { Agenda } from "@/components";

type HistoryDataProps = {
  name: string;
  hours: string;
};

type HistoryProps = {
  title: string;
  data: HistoryDataProps[];
};

const DATA: HistoryProps[] = [
  {
    title: "2024-07-09",
    data: [
      {
        name: "BHUT",
        hours: "08:00 - 12:00",
      },
      {
        name: "Bepay",
        hours: "15:30 - 17:00",
      },
      {
        name: "Ambev",
        hours: "17:30 -18:00",
      },
    ],
  },
  {
    title: "2024-07-10",
    data: [
      {
        name: "Bepay",
        hours: "15:30 - 17:00",
      },
      {
        name: "Ambev",
        hours: "17:30 -18:00",
      },
    ],
  },
  {
    title: "2024-07-11",
    data: [
      {
        name: "Bepay",
        hours: "15:30 - 17:00",
      },
      {
        name: "Ambev",
        hours: "17:30 -18:00",
      },
    ],
  },
  {
    title: "2024-07-12",
    data: [
      {
        name: "Bepay",
        hours: "15:30 - 17:00",
      },
      {
        name: "Ambev",
        hours: "17:30 -18:00",
      },
    ],
  },
];

export const History = () => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  return (
    <Box flex={1} {...safeAreaProps}>
      <Agenda data={DATA} />
    </Box>
  );
};
