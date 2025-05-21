import { PropsAuths } from "@store/auth";
import { shortAddress } from "@utils";

export const GetEmail = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const email = data?.user?.email
      ? data?.user?.email
      : data?.user?.userConnects && data?.user?.userConnects[0]?.account;
    return shortAddress(email, 8);
  }
};

export const GetUserName = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const name = data?.user?.displayName
      ? data?.user?.displayName
      : `User ${data?.user?.id}`;

    return shortAddress(name, 8);
  }
};
