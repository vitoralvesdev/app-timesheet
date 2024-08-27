import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "@/stores/helpers/withSetPropAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@react-native-google-signin/google-signin";
import Geolocation from "@react-native-community/geolocation";

const AUTH_DATA = "APP_TIMESHEET_AUTH_DATA";

const saveAuthData = async (data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(AUTH_DATA, jsonData);
  } catch (error) {
    console.error("Erro ao salvar dados de autenticação", error);
  }
};

const loadAuthData = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(AUTH_DATA);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error("Erro ao carregar dados de autenticação", error);
    return null;
  }
};

const removeAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_DATA);
  } catch (error) {
    console.error("Erro ao remover dados de autenticação", error);
  }
};

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    idToken: "",
    name: "",
    photo: "",
    email: "",
    recordedLatitude: 0,
    recordedLongitude: 0,
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.idToken;
    },
    get isName() {
      return store.name;
    },
    get isPhoto() {
      return store.photo;
    },
    get isCurrentLocation() {
      return {
        recordedLatitude: store.recordedLatitude,
        recordedLongitude: store.recordedLongitude,
      };
    },
  }))
  .actions((store) => ({
    async login(res: User) {
      const { user } = res;

      store.setProp("idToken", res.idToken);
      store.setProp("name", user.name);
      store.setProp("photo", user.photo);
      store.setProp("email", user.email);

      await saveAuthData({
        idToken: res.idToken,
        name: user.name,
        photo: user.photo,
        email: user.email,
      });
    },

    async logout() {
      store.setProp("idToken", "");
      store.setProp("name", "");
      store.setProp("photo", "");
      store.setProp("email", "");

      await removeAuthData();
    },

    async loadData() {
      const data = await loadAuthData();

      if (data) {
        store.setProp("idToken", data.idToken);
        store.setProp("name", data.name);
        store.setProp("photo", data.photo);
        store.setProp("email", data.email);
      }
    },

    async getCurrentPosition() {
      Geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          store.setProp("recordedLatitude", latitude);
          store.setProp("recordedLongitude", longitude);
        },
        (error) =>
          console.log(
            "Erro ao carregar a localização atual",
            JSON.stringify(error),
          ),
        { enableHighAccuracy: true },
      );
    },
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
