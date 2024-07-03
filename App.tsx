import { NativeBaseProvider } from 'native-base'
import { THEME } from "@/theme";
import SignIn from "@/screens/signIn";

export default function App() {
  return (
      <NativeBaseProvider theme={THEME}>
          <SignIn />
    </NativeBaseProvider>
  );
}