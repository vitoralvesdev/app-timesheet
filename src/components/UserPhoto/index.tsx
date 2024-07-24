import { Image } from "native-base";

export const UserPhoto = (props) => {
  return (
    <Image
      alt="Foto do usuário"
      source={{ uri: "https://github.com/vitoralvesdev.png" }}
      w={38}
      h={38}
      rounded="full"
      {...props}
    />
  );
};
