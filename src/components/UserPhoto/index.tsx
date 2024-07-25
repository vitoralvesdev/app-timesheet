import { Image } from "native-base";

export const UserPhoto = (props) => {
  return (
    <Image alt="Foto do usuário" w={38} h={38} rounded="full" {...props} />
  );
};
