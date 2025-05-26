import { PropsAuths } from "@store/auth";
import { shortAddress } from "@utils";

export const GetEmail = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const email = data?.user?.email
      ? data?.user?.email
      : data?.user?.userConnects && data?.user?.userConnects[0]?.account;
    return email && email.length > 24
      ? shortAddress(email, 8)
      : email
        ? email
        : "account";
  }
};

export const GetUserName = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const name = data?.user?.displayName
      ? data?.user?.displayName
      : `User ${data?.user?.id}`;

    return name && name.length > 24
      ? shortAddress(name, 8)
      : name
        ? name
        : "name";
  }
};
