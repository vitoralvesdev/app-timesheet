import { NativeBaseProvider } from 'native-base'
import { THEME } from "@/theme/colors";
import { Routes } from "@/routes";

export default function App() {
  return (
      <NativeBaseProvider theme={THEME}>
          <Routes />
      </NativeBaseProvider>
  );
}