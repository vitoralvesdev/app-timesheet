import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { observer } from "mobx-react-lite";
import { CustomModal } from "@/components/Modals/CustomModal";
import { DevSettings } from "react-native";

export const NetworkState = observer(function () {
  const [withoutInternet, setWithoutInternet] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setWithoutInternet(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function onReload() {
    setWithoutInternet(!withoutInternet);
    DevSettings.reload();
  }

  return (
    <CustomModal
      visible={withoutInternet}
      description="Sem acesso a internet!"
      preset="error"
      closeCallback={onReload}
      cancelCallback={onReload}
    />
  );
});
