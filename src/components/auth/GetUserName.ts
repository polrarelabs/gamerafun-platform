import { PropsAuths } from "@store/auth";
import { shortAddress } from "@utils";

export const GetUserName = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const name = data?.user?.displayName
      ? data?.user?.displayName
      : `User ${data?.user?.id}`;

    if (name && name.length > 16) {
      return shortAddress(name, 8);
    }
    return name;
  }
};
